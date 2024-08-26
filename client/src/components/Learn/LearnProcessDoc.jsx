import React, { useState } from "react";
import { Tag } from "antd";
import { List, Card } from "antd";

const PageDocumentList = ({ pages }) => {
  return (
    <div className="w-full min-h-[250px]">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Page Documents</h2>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={pages}
        renderItem={(page) => (
          <List.Item>
            <Card
              title={`Page ${page.Page}`}
              bordered={false}
              className="shadow-md"
            >
              <p className="text-gray-700">{page.Content}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

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

  const pages = [
    {
      PageDocumentID: "1",
      Content: "This is the content of page 1.",
      Page: 1,
    },
    {
      PageDocumentID: "2",
      Content: "This is the content of page 2.",
      Page: 2,
    },
    {
      PageDocumentID: "3",
      Content: "This is the content of page 3.",
      Page: 3,
    },
  ];

  return (
    <div className="w-full min-h-[500px] p-6 bg-white rounded-xl shadow-lg flex flex-col gap-2">
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
        <PageDocumentList pages={pages} />
      </div>
    </div>
  );
}


export default LearnProcessDoc;
