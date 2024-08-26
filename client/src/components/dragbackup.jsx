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
import LessonDetails from "./LessonItemList";

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="text-black p-4 mb-2 bg-gray-400 rounded shadow"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.children}
    </div>
  );
}
const initialLessons = [
  { id: "1", content: "Lesson 1 Content" },
  { id: "2", content: "Lesson 2 Content" },
  { id: "3", content: "Lesson 3 Content" },
  { id: "4", content: "Lesson 4 Content" },
  { id: "5", content: "Lesson 5 Content" },
];

const LessonDrag = () => {
  const [lessons, setLessons] = useState(initialLessons);

  const sensors = useSensors(
    useSensor(PointerSensor),
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
        {lessons.map((lesson, index) => (
          <SortableItem key={lesson.id} id={lesson.id}>
            <div className="p-4 mb-2 bg-gray-200 rounded shadow">
              <div className="font-bold">Lesson {index + 1}</div>
              <div>{lesson.content}</div>
              <LessonDetails />
            </div>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default LessonDrag;
