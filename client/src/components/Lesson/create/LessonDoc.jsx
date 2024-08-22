import React, { useState } from "react";
import { Input, Button, Form, Select, InputNumber, message } from "antd";
import axios from "axios";
import LessonService from "../../../services/Lesson.Service";
import { useParams } from "react-router-dom";
import { resetStateLessonDrag } from "../../../redux/features/resetStateSlice";
import { useDispatch } from "react-redux";
const { Option } = Select;

function CreateLessonDocument() {
  const [loading, setLoading] = useState(false);
  const { courseID } = useParams();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await LessonService.LessonDocument.createLessonDocument(
        courseID,
        values.title,
        values.duration,
        values.complexityLevel,
        values.topic,
        values.orderLesson
      );
      if (response.status === 200) {
        message.success("Lesson document created successfully");
        setLoading(false);
        dispatch(resetStateLessonDrag());
      } else {
        message.error("Error creating lesson  document");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating lesson document: ", error);
      message.error(
        error.message || "An error occurred while creating the lesson document."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-lg">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Document Title"
          rules={[
            { required: true, message: "Please enter the document title" },
          ]}
        >
          <Input placeholder="Enter document title" />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration (minutes)"
          rules={[{ required: true, message: "Please enter the duration" }]}
        >
          <InputNumber
            min={1}
            placeholder="Enter duration"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="complexityLevel"
          label="Complexity Level"
          rules={[
            { required: true, message: "Please select a complexity level" },
          ]}
        >
          <Select placeholder="Select complexity level">
            <Option value="Easy">Easy</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Hard">Hard</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="topic"
          label="Topic"
          rules={[{ required: true, message: "Please enter the topic" }]}
        >
          <Input placeholder="Enter topic" />
        </Form.Item>

        <Form.Item
          name="orderLesson"
          label="Order"
          rules={[
            { required: true, message: "Please enter the order of the lesson" },
          ]}
        >
          <InputNumber
            min={1}
            placeholder="Enter lesson order"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Lesson Document
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateLessonDocument;
