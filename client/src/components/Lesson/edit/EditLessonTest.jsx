import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Radio, Form, message, Tooltip } from "antd";
import LessonBase from "../LessonBase";
import LessonService from "../../../services/Lesson.Service";
import { resetState } from "../../../redux/features/resetStateSlice";
import { useDispatch } from "react-redux";

const AddQuestionModal = ({ visible, onClose, lessonTestID }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]); // State to store the options
  const dispatch = useDispatch();

  const handleAdd = async (values) => {
    setLoading(true);
    try {
      const response = await LessonService.LessonTest.addQuestionToTest(
        lessonTestID,
        values.title,
        values.questionContent,
        values.option1,
        values.option2,
        values.option3,
        values.answer
      );
      if (response.status === 200) {
        message.success("Question added successfully");
        setLoading(false);
        dispatch(resetState());
        onClose();
      } else {
        message.error("Error adding question");
        setLoading(false);
      }
    } catch (error) {
      message.error(
        error.message || "An error occurred while adding the question."
      );
      setLoading(false);
    }
  };

  const handleOptionChange = (changedValues, allValues) => {
    const { option1, option2, option3 } = allValues;
    setOptions([option1, option2, option3]);
  };

  return (
    <Modal
      visible={visible}
      title="Add New Question"
      onCancel={onClose}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleAdd}
        initialValues={{}}
        onValuesChange={handleOptionChange} // Track changes in the options
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          name="questionContent"
          label="Question"
          rules={[{ required: true, message: "Please enter the question" }]}
        >
          <Input placeholder="Enter question" />
        </Form.Item>

        <Form.Item
          name="option1"
          label="Option 1"
          rules={[{ required: true, message: "Please enter option 1" }]}
        >
          <Input placeholder="Enter option 1" />
        </Form.Item>

        <Form.Item
          name="option2"
          label="Option 2"
          rules={[{ required: true, message: "Please enter option 2" }]}
        >
          <Input placeholder="Enter option 2" />
        </Form.Item>

        <Form.Item
          name="option3"
          label="Option 3"
          rules={[{ required: true, message: "Please enter option 3" }]}
        >
          <Input placeholder="Enter option 3" />
        </Form.Item>

        <Form.Item
          name="answer"
          label="Correct Answer"
          rules={[
            { required: true, message: "Please select the correct answer" },
          ]}
        >
          <Radio.Group>
            {options.map((option, index) => (
              <Radio key={index} value={option}>
                {option ? `Option ${index + 1}: ` : `Option ${index + 1}`}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Add Question
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UpdateQuestionModal = ({ visible, onClose, questionData, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      const response = await LessonService.LessonTest.updateQuestionToTest(
        questionData.QuestionID,
        questionData.LessonTestID,
        values.title,
        values.questionContent,
        values.option1,
        values.option2,
        values.option3,
        values.answer
      );
      if (response.status === 200) {
        message.success("Question updated successfully");
        setLoading(false);
        dispatch(resetState());
        onClose();
      } else {
        message.error("Error updating question");
        setLoading(false);
      }
    } catch (error) {
      message.error(
        error.message || "An error occurred while updating the question."
      );
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Update Question"
      onCancel={onClose}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleUpdate}
        initialValues={{
          title: questionData.Title,
          questionContent: questionData.QuestionContent,
          option1: questionData.Answers[0].AnswerText,
          option2: questionData.Answers[1].AnswerText,
          option3: questionData.Answers[2].AnswerText,
          answer: questionData.Answers.find((ans) => ans.IsCorrect)?.AnswerText, // Pass the correct answer text
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          name="questionContent"
          label="Question"
          rules={[{ required: true, message: "Please enter the question" }]}
        >
          <Input placeholder="Enter question" />
        </Form.Item>

        <Form.Item
          name="option1"
          label="Option 1"
          rules={[{ required: true, message: "Please enter option 1" }]}
        >
          <Input placeholder="Enter option 1" />
        </Form.Item>

        <Form.Item
          name="option2"
          label="Option 2"
          rules={[{ required: true, message: "Please enter option 2" }]}
        >
          <Input placeholder="Enter option 2" />
        </Form.Item>

        <Form.Item
          name="option3"
          label="Option 3"
          rules={[{ required: true, message: "Please enter option 3" }]}
        >
          <Input placeholder="Enter option 3" />
        </Form.Item>

        <Form.Item
          name="answer"
          label="Correct Answer"
          rules={[
            { required: true, message: "Please select the correct answer" },
          ]}
        >
          <Radio.Group>
            <Radio value={questionData.Answers[0].AnswerText}>Option 1</Radio>
            <Radio value={questionData.Answers[1].AnswerText}>Option 2</Radio>
            <Radio value={questionData.Answers[2].AnswerText}>Option 3</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Update Question
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Question = ({ questionText, options, onEdit, QuestionID }) => {
  // Find the correct answer's AnswerID
  const correctAnswerID = options.find((option) => option.IsCorrect)?.AnswerID;

  return (
    <div
      className="mb-4 p-4 bg-white rounded-lg shadow-sm cursor-pointer"
      onClick={onEdit}
    >
      <p className="text-gray-300 italic">Question ID: {QuestionID}</p>
      <h3 className="text-lg font-semibold mb-2">{questionText}</h3>

      <Radio.Group
        className="flex flex-col gap-2"
        value={correctAnswerID} // Set the correct answer as the selected value
        disabled // Disable the radio buttons to prevent user interaction
      >
        {options.map((option, index) => (
          <Radio
            key={index}
            value={option.AnswerID}
            className="custom-radio" // Add custom class
          >
            <span className="text-normal">{option.AnswerText}</span>
            {option.IsCorrect && <strong>(Correct)</strong>}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

function EditLessonTest(props) {
  const questions = props.detail; // Lấy danh sách câu hỏi từ props
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // Add modal visibility state

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setIsModalVisible(true);
  };
  const handleAddQuestion = () => {
    setIsAddModalVisible(true);
  };

  return (
    <div className="w-full min-h-[500px] p-6 bg-white rounded-xl shadow-lg flex flex-col gap-3">
      <div className="bg-gray-100 rounded-lg p-4">
        <LessonBase
          LessonsID={props.lesson.LessonsID}
          Title={props.lesson.Title}
          Duration={props.lesson.Duration}
          ComplexityLevel={props.lesson.ComplexityLevel}
          CreatedTime={props.lesson.CreatedTime}
          UpdatedTime={props.lesson.UpdatedTime}
          LessonType={props.lesson.LessonType}
          Topic={props.lesson.Topic}
          OrderLessons={props.lesson.OrderLessons}
          CourseID={props.lesson.CourseID}
        />
      </div>

      <div className="h-full min-h-[250px] w-full rounded-md bg-gray-100 p-4">
        <p className="mx-auto  italic text-center">
          {" "}
          Click on a question to edit it{" "}
        </p>
        {questions?.map((question, index) => (
          <Tooltip title="Click to edit question">
            <Question
              key={index}
              QuestionID={question.QuestionID}
              questionText={question.QuestionContent}
              options={question.Answers}
              onEdit={() => handleEditQuestion(question)}
            />
          </Tooltip>
        ))}
      </div>

      {selectedQuestion && (
        <UpdateQuestionModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          questionData={selectedQuestion}
        />
      )}
      <AddQuestionModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        lessonTestID={props.lesson.LessonTestID}
      />
      <button>
        <Button type="primary" onClick={handleAddQuestion} className="">
          Add New Question
        </Button>
      </button>
    </div>
  );
}

export default EditLessonTest;
