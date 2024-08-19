import React from "react";
import { Tag } from "antd";
import { Radio } from "antd";
import LessonBase from "../LessonBase";


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

function EditLessonTest(lesson,detail) {

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
      <LessonBase {...lesson} />
      </div>

      <div className="h-full min-h-[250px] w-full rounded-md bg-gray-100 p-4">
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

export default EditLessonTest;
