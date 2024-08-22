import React, { useState, memo } from "react";
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

function SortableItem({ id, index, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children(index)} {/* Pass index to the children */}
    </div>
  );
}

const LessonDocDrag = ({ pages }) => {
  const [lessons, setLessons] = useState(pages);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Allow drag after moving a certain distance
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
        const oldIndex = items.findIndex(
          (item) => item.PageDocumentID === active.id
        );
        const newIndex = items.findIndex(
          (item) => item.PageDocumentID === over.id
        );
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
            <SortableItem
              key={page.PageDocumentID}
              id={page.PageDocumentID}
              index={index}
            >
              {(index) => (
                <Card
                  title={`Page ${index + 1}`}
                  bordered={false}
                  extra={
                    <button
                      onClick={() => alert("You clicked on the button")}
                      className="btn"
                      type="primary"
                    >
                      Click here
                    </button>
                  }
                  className="shadow-2xl mt-2"
                >
                  <p className="text-gray-700">{page.Content}</p>
                  <input
                    type="text"
                    className="w-full mt-2 p-2 border-2 border-gray-300 rounded-md"
                    onMouseDown={(e) => e.stopPropagation()} // Prevent drag event when interacting with the input
                  />
                </Card>
              )}
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );
};

function EditLessonDocument(props) {
  const pages = props.detail; 

  return (
    <div className="w-full min-h-[500px] p-6 bg-white rounded-xl shadow-lg flex flex-col gap-2">
      <div className="bg-gray-100 rounded-lg p-4">
        <LessonBase
          LessonsID={props.lesson.LessonsID}
          Title={props.lesson.Title}
          Duration={props.lesson.Duration}
          ComplexityLevel={props.lesson.ComplexityLevel}
          CreatedTime={props.lesson.CreatedTime}
          UpdatedTime={props.lesson.UpdatedTime}
          LessonType={props.lesson.LessonType}
          Topic={props.lesson.Topic}
          OrderLessons={props.lesson.OrderLessons}
          CourseID={props.lesson.CourseID}
        />
      </div>
      <div className="h-full min-h-[250px] w-full rounded-md bg-gray-100 p-4">
        <LessonDocDrag pages={pages} />
      </div>
    </div>
  );
}

export default memo(EditLessonDocument);
