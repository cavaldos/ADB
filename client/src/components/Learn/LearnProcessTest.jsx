import React from "react";
import { Tag } from "antd";
import { Radio } from "antd";

const Question = ({ questionText, options }) => {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{questionText}</h3>
      <Radio.Group className="flex flex-col gap-2">
        {options.map((option, index) => (
          <Radio key={index} value={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

function LearnProcessTest() {
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

  const questions = [
    {
      questionText: "What is React?",
      options: [
        "A JavaScript library for building user interfaces",
        "A CSS framework",
        "A database system",
      ],
    },
    {
      questionText: "Which of the following is a React feature?",
      options: ["Virtual DOM", "Two-way data binding", "None of the above"],
    },
    {
      questionText: "Who maintains React?",
      options: ["Google", "Facebook", "Twitter"],
    },
  ];

  return (
    <div className="w-full min-h-[500px] p-6 bg-white rounded-xl shadow-lg flex flex-col gap-3">
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

      <div className="h-full min-h-[250px] w-full rounded-md bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Lesson Test</h2>
        {questions.map((question, index) => (
          <Question
            key={index}
            questionText={question.questionText}
            options={question.options}
          />
        ))}
      </div>
    </div>
  );
}

export default LearnProcessTest;