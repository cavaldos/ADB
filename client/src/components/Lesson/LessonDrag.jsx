import React, { useState, useEffect } from "react";
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

import LessonService from "../../services/Lesson.Service";
import { useParams } from "react-router-dom";
import { LessonItemList } from "./LessonItemList";

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="text-black mb-2   rounded shadow"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.children}
    </div>
  );
}

const LessonDrag = () => {
  const { courseID } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    LessonService.getAllLessonsByCourseID(courseID).then((response) => {
      const formattedData = response.data.map((lesson) => ({
        id: lesson.LessonsID, // Ensure the id is a string
        courseID: lesson.CourseID,
        complexityLevel: lesson.ComplexityLevel,
        createdTime: lesson.CreatedTime,
        duration: lesson.Duration,
        lessonType: lesson.LessonType,
        title: lesson.Title,
        topic: lesson.Topic,
        order: lesson.OrderLesson,
        updatedTime: lesson.UpdatedTime,
      }));
      setLessons(formattedData);
    });
  }, [courseID]);

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
        {lessons.map((lesson, index) => {
          return (
            <SortableItem key={lesson.id} id={lesson.id}>
              <LessonItemList
                key={index}
                CourseID={lesson.courseID}
                LessonsID={lesson.id}
                ComplexityLevel={lesson.complexityLevel}
                CreatedTime={lesson.createdTime}
                Duration={lesson.duration}
                LessonType={lesson.lessonType}
                OrderLesson={index + 1}
                Title={lesson.title}
                Topic={lesson.topic}
                UpdatedTime={lesson.updatedTime}
              />
              {/* <div className="p-4 mb-2 bg-gray-200 rounded shadow">
              {index}-{lesson.title} - {lesson.content} - Order: {lesson.order}
            </div> */}
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );
};

export default LessonDrag;
