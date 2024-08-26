import React, { useState } from "react";
import { Modal, Button, Form, Input, Tag, message } from "antd";
import LessonService from "../../services/Lesson.Service";
import { resetState } from "../../redux/features/resetStateSlice";
import { useDispatch } from "react-redux";

function LessonBase(props) {
  const {
    LessonsID,
    Title,
    ComplexityLevel,
    Duration,
    LessonType,
    Topic,
    updateLesson, // Pass updateLesson function as a prop
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdate = async (values) => {
    console.log("Update lesson values: ", values);
    setLoading(true); // Set loading to true before making the request
    try {
      const response = await LessonService.updateLesson(
        LessonsID,
        values.title,
        values.duration,
        values.complexityLevel
      );
      if (response.status === 200) {
        message.success("Lesson updated successfully!");
        setIsModalVisible(false); // Close modal after successful update
        dispatch(resetState()); // Reset state after successful update
      } else {
        message.error("Failed to update lesson.");
      }
    } catch (error) {
      message.error("An error occurred while updating the lesson.");
    } finally {
      setLoading(false); // Reset loading state after request is finished
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="mb-4">
        <div className="flex gap-2 items-center">
          <h3 className="text-lg text-gray-900 font-medium">Lesson Title:</h3>
          <span className="text-lg font-semibold text-gray-700 italic">
            {Title}
          </span>
        </div>
        <div className="flex gap-2 items-center mt-2">
          <h3 className="text-lg text-gray-900 font-medium">Topic:</h3>
          <span className="text-lg font-semibold text-gray-700 italic">
            {Topic}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <Tag className="w-auto inline-block max-w-max" color="blue">
          {`Duration: ${Duration}`}
        </Tag>
        <Tag className="w-auto inline-block max-w-max" color="green">
          {`Complexity: ${ComplexityLevel}`}
        </Tag>
        <Tag className="w-auto inline-block max-w-max" color="purple">
          {`Type: ${LessonType}`}
        </Tag>
      </div>

      <Button type="primary" onClick={showModal}>
        Update Lesson
      </Button>

      <Modal
        title="Update Lesson"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleUpdate}
          initialValues={{
            title: Title,
            duration: Duration,
            complexityLevel: ComplexityLevel,
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="Enter lesson title" />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: "Please enter the duration" }]}
          >
            <Input placeholder="Enter duration" />
          </Form.Item>

          <Form.Item
            name="complexityLevel"
            label="Complexity Level"
            rules={[
              { required: true, message: "Please enter the complexity level" },
            ]}
          >
            <Input placeholder="Enter complexity level" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Update Lesson
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default LessonBase;
