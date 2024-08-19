import React, { useState } from "react";
import { Input, Button, Form, Select,Tag } from "antd";

const { TextArea } = Input;

function AddPageDocument({ lessons }) {
  const [pageDocument, setPageDocument] = useState({
    Content: "",
    Page: "",
    LessonDocID: "",
  });

  const handleChange = (e) => {
    setPageDocument({ ...pageDocument, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setPageDocument({ ...pageDocument, LessonDocID: value });
  };

  const handleSubmit = () => {
    console.log("Page Document Data:", pageDocument);
    // Handle the submission logic here, such as sending the data to the server.
  };

  return (
    <div className="w-full min-h-[500px] p-6 bg-white rounded-xl shadow-lg flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-700">Add Page Document</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Content">
          <TextArea
            rows={4}
            name="Content"
            value={pageDocument.Content}
            onChange={handleChange}
            placeholder="Enter the content of the page document"
            required
          />
        </Form.Item>
        <Form.Item label="Page Number">
          <Input
            type="number"
            name="Page"
            value={pageDocument.Page}
            onChange={handleChange}
            placeholder="Enter the page number"
            required
          />
        </Form.Item>
        <Form.Item label="Select Lesson">
          <Select
            placeholder="Select a lesson"
            value={pageDocument.LessonDocID}
            onChange={handleSelectChange}
          >
            {lessons.map((lesson) => (
              <Select.Option
                key={lesson.LessonDocID}
                value={lesson.LessonDocID}
              >
                {lesson.Title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Page Document
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

// Example usage with mock data for lessons
const lessons = [
  { LessonDocID: "1", Title: "Lesson 1" },
  { LessonDocID: "2", Title: "Lesson 2" },
  { LessonDocID: "3", Title: "Lesson 3" },
];

function LearnProcessDoc() {
  return (
    <div className="w-full min-h-[500px] p-6 bg-white rounded-xl shadow-lg flex flex-col gap-2">
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="mb-4">
          <div className="flex gap-2 items-center">
            <h3 className="text-lg text-gray-900 font-medium">Lesson Title:</h3>
            <span className="text-lg font-semibold text-gray-700 italic">
              Introduction to React
            </span>
          </div>
          <div className="flex gap-2 items-center mt-2">
            <h3 className="text-lg text-gray-900 font-medium">Topic:</h3>
            <span className="text-lg font-semibold text-gray-700 italic">
              React Basics
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <Tag className="w-auto inline-block max-w-max" color="blue">
            {`Duration: 45 minutes`}
          </Tag>
          <Tag className="w-auto inline-block max-w-max" color="green">
            {`Complexity: Beginner`}
          </Tag>
          <Tag className="w-auto inline-block max-w-max" color="purple">
            {`Type: Video`}
          </Tag>
        </div>
      </div>

      <div className="h-full min-h-[250px] w-full rounded-md bg-gray-100 p-4">
        <AddPageDocument lessons={lessons} />
      </div>
    </div>
  );
}

export default LearnProcessDoc;
