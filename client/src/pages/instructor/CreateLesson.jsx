import React, { useState, useEffect } from "react";
import { MdOndemandVideo } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { SiSpeedtest } from "react-icons/si";
import { MdCreateNewFolder } from "react-icons/md";

import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import LessonServiceAPI from "../../services/Lesson.Service";
import TabMenu from "../../components/other/TabMenu";
import CreateLessonVideo from "../../components/Lesson/edit/EditLessonVideo";
import CreateLessonDocument from "../../components/Lesson/edit/EditLessonDoc";
import CreateLessonTest from "../../components/Lesson/edit/EditLessonTest";

import LessonItemList from "../../components/Lesson/LessonItemList";
import LessonDrag from "../../components/Lesson/LessonDrag";
import LessonService from "../../components/Lesson/LessonService";
import EditLession from "../../components/Lesson/EditLession";
import CourseService from "../../services/Course.service";
import { Button, Modal, Form, Input, Tag } from "antd";
const InforCourse = () => {
  const { courseID } = useParams();
  const [data, setData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Tạo instance của form

  useEffect(() => {
    CourseService.getCourseDetail(courseID).then((res) => {
      setData(res.data[0]);
      console.log(res.data[0]);
    });
  }, [courseID]);

  const showModal = () => {
    form.setFieldsValue(data); // Đặt giá trị ban đầu cho form
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); 
      setData(values); 
      console.log(values);

      setIsModalVisible(false);
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-4">
      <div className="p-4 rounded-md shadow-md">
        <h1 className="text-2xl mb-4">{data.Title}</h1>
        <p className="mb-2">
          <em>Description:</em> <strong>{data.Description}</strong>
        </p>
        <p className="mb-2">
          <em>Language:</em> <Tag color="blue">{data.Language}</Tag>
        </p>
        <p className="mb-2">
          <em>Status:</em> <strong>{data.Status}</strong>
        </p>
        <p className="mb-2">
          <em>Price:</em> <strong>${data.Price}</strong>
        </p>
        <p className="mb-2">
          <em>Category:</em> <strong>{data.CategoryName}</strong>
        </p>
        <p className="mb-2">
          <em>Instructor:</em> <strong>{data.FullName}</strong>
        </p>
        <Button type="primary" onClick={showModal}>
          Edit Course Information
        </Button>
      </div>

      <Modal
        title="Edit Course Information"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          initialValues={{
            Title: data.Title,
            Description: data.Description,
            Language: data.Language,
            Status: data.Status,
            Price: data.Price,
            CategoryName: data.CategoryName,
            FullName: data.FullName,
          }}
        >
          <Form.Item
            label="Title"
            name="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Language"
            name="Language"
            rules={[{ required: true, message: "Please input the language!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="Status"
            rules={[{ required: true, message: "Please input the status!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="CategoryName"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Instructor"
            name="FullName"
            rules={[
              { required: true, message: "Please input the instructor name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
const CreateLesson = () => {
  const { courseID, lessonID, navigate } = LessonService();
  const tabs = [
    {
      id: 1,
      name: "Create Video",
      icon: <MdOndemandVideo />,
      Element: <CreateLessonVideo />,
    },
    {
      id: 2,
      name: "Create Document",
      icon: <GrDocumentText />,
      Element: <CreateLessonDocument />,
    },
    {
      id: 3,
      name: "Create Test",
      icon: <SiSpeedtest />,
      Element: <CreateLessonTest />,
    },
  ];

  return (
    <div className="w-2/3  flex items-start justify-center text-black p-4 border-[1px] border-[#D1D7DB]">
      {lessonID ? (
        <div className=" flex flex-col w-full">
          <button
            onClick={() => {
              navigate(`/new-course/${courseID}/create-lesson`);
            }}
            className=" btn btn-small flex hover:cursor-pointer rounded-md w-1/5 mb-2"
          >
            <MdCreateNewFolder className=" text-xl" />
            <h1 className="mr-auto text-lg font-bold">Create new lesson</h1>
          </button>
          <EditLession />
        </div>
      ) : (
        <div className=" min-w-[900px]">
          <TabMenu tabs={tabs} />
        </div>
      )}
    </div>
  );
};

const LessonList = () => {
  const { courseID } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    LessonServiceAPI.getAllLessonsByCourseID(courseID).then((res) => {
      setLessons(res.data);
    });
  }, [courseID]);

  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    {
      id: 1,
      name: "Lesson Detail",
      Element: (
        <div className="flex flex-col gap-2 text-black">
          <LessonItemList />
        </div>
      ),
    },
    {
      id: 2,
      name: "Sort Lesson",
      Element: (
        <div className="flex flex-col gap-2 text-black">
          <p className="text-gray-600 text-sm italic mx-auto">
            {" "}
            Hãy kéo thả để sắp xếp bài học
          </p>
          <LessonDrag />
        </div>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "33.33%",
        p: 4,
        border: "1px solid #D1D7DB",
        color: "white",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Typography
        className="text-blue-gray-700 font-nunito font-bold bg-gray-200 py-2 rounded-md text-center"
        variant="h6"
        gutterBottom
      >
        Lesson List
      </Typography>
      <TabMenu tabs={tabs} />
    </Box>
  );
};
const CreateLessonPage = () => {
  const [course, setCourse] = useState({
    title: "",
    subtitle: "",
    description: "",
    language: "English",
    image: "",
    price: "",
    status: "Hide",
    categoryID: "",
    instructorID: "",
  });

  return (
    <>
      <InforCourse />
      <div className="flex flex-row min-h-screen gap-3 ">
        <CreateLesson />
        <LessonList />
      </div>
    </>
  );
};

export default CreateLessonPage;
