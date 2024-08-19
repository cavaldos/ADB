import React from "react";
import { Tag } from "antd";

function LessonBase(props) {
  const {
    LessonsID,
    ComplexityLevel,
    Duration,
    CreatedTime,
    UpdatedTime,
    LessonType,
    Topic,
  } = props; 
  console.log("props khanh",props);
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
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="mb-4">
        <div className="flex gap-2 items-center">
          <h3 className="text-lg text-gray-900 font-medium">Lesson Title:</h3>
          <span className="text-lg font-semibold text-gray-700 italic">
            {exampleLesson.Title}
          </span>
        </div>
        <div className="flex gap-2 items-center mt-2">
          <h3 className="text-lg text-gray-900 font-medium">Topic:</h3>
          <span className="text-lg font-semibold text-gray-700 italic">
            {exampleLesson.Topic}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <Tag className="w-auto inline-block max-w-max" color="blue">
          {`Duration: ${exampleLesson.Duration}`}
        </Tag>
        <Tag className="w-auto inline-block max-w-max" color="green">
          {`Complexity: ${exampleLesson.ComplexityLevel}`}
        </Tag>
        <Tag className="w-auto inline-block max-w-max" color="purple">
          {`Type: ${exampleLesson.LessonType}`}
        </Tag>
      </div>
    </div>
  );
}

export default LessonBase;
