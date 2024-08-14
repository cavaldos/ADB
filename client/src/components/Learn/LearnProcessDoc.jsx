import React from "react";
import { Tag } from "antd";

function LearnProcessDoc() {
  const exampleLesson = {
    LessonsID: "1",
    Title: "Introduction to React",
    Duration: "45 minutes",
    ComplexityLevel: "Beginner",
    CreatedTime: "2023-08-01 10:00:00",
    UpdatedTime: "2023-08-02 12:00:00",
    LessonType: "Video",
    Topic: "React Basics",
    OrderLessons: "1",
    CourseID: "101",
  };

  return (
    <div className="w-full min-h-[500px] p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Lesson Information
      </h2>
      <p className="text-gray-500 mb-6">
        This is the lesson overview where you can see all the important details
        of the lesson.
      </p>

      <div className="bg-gray-100 rounded-lg p-4">
        <div className="mb-4">
          <div className="flex gap-2 items-center">
            <h3 className="text-lg text-gray-700 font-medium">Lesson Title:</h3>
            <span className="text-lg font-semibold text-gray-900">
              {exampleLesson.Title}
            </span>
          </div>
          <div className="flex gap-2 items-center mt-2">
            <h3 className="text-lg text-gray-700 font-medium">Topic:</h3>
            <span className="text-lg font-semibold text-gray-900">
              {exampleLesson.Topic}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <Tag color="blue">{`Duration: ${exampleLesson.Duration}`}</Tag>
          <Tag color="green">{`Complexity: ${exampleLesson.ComplexityLevel}`}</Tag>
          <Tag color="geekblue">{`Created: ${exampleLesson.CreatedTime}`}</Tag>
          <Tag color="volcano">{`Updated: ${exampleLesson.UpdatedTime}`}</Tag>
          <Tag color="purple">{`Type: ${exampleLesson.LessonType}`}</Tag>
          <Tag color="cyan">{`Order: ${exampleLesson.OrderLessons}`}</Tag>
        </div>
      </div>
    </div>
  );
}

export default LearnProcessDoc;
