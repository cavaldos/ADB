import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "antd";
import LessonBase from "../LessonBase";

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className=""
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.children}
    </div>
  );
}

const LessonDocDrag = ({ pages }) => {
  const [lessons, setLessons] = useState(pages);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Cho phép kéo sau khi di chuyển một khoảng cách
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setLessons((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={lessons} strategy={verticalListSortingStrategy}>
        {lessons.map((page, index) => {
          return (
            <SortableItem key={page.id} id={page.id}>
              <Card
                title={`Page ${index + 1}`}
                bordered={false}
                extra={
                  <button
                    onClick={() => alert("You clicked on the button")}
                    className="btn"
                    type="primary"
                  >
                    Bấm vào đây
                  </button>
                }
                className="shadow-2xl mt-2"
              >
                <p className="text-gray-700">{page.content}</p>
                <input
                  type="text"
                  className="w-full mt-2 p-2 border-2 border-gray-300 rounded-md"
                  onMouseDown={(e) => e.stopPropagation()} // Ngăn chặn sự kiện kéo khi tương tác với ô nhập liệu
                />
              </Card>
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );
};

function EditLessonDocument(lesson,detail) {
  const pages = [
    { id: "1", content: "Lesson 1 Content" },
    { id: "2", content: "Lesson 2 Content" },
    { id: "3", content: "Lesson 3 Content" },
    { id: "4", content: "Lesson 4 Content" },
    { id: "5", content: "Lesson 5 Content" },
  ];


  return (
    <div className="w-full min-h-[500px] p-6 bg-white rounded-xl shadow-lg flex flex-col gap-2">
      <div className="bg-gray-100 rounded-lg p-4">
        <LessonBase {...lesson} />
      </div>
      <div className="h-full min-h-[250px] w-full rounded-md bg-gray-100 p-4">
        <LessonDocDrag pages={pages} />
      </div>
    </div>
  );
}

export default EditLessonDocument;
