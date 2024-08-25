import React, { useState, useEffect } from "react";
import { MdOndemandVideo } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { SiSpeedtest } from "react-icons/si";
import { MdCreateNewFolder } from "react-icons/md";

import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import LessonServiceAPI from "../../services/Lesson.Service";
import TabMenu from "../../components/other/TabMenu";
import CreateLessonVideo from "../../components/Lesson/create/LessonVideo";
import CreateLessonDocument from "../../components/Lesson/create/LessonDoc";
import CreateLessonTest from "../../components/Lesson/create/LessonTest";

import LessonItemList from "../../components/Lesson/LessonItemList";
import LessonDrag from "../../components/Lesson/LessonDrag";
import EditLession from "../../components/Lesson/EditLession";
import CourseService from "../../services/Course.service";
import { Button, Modal, Form, Input, Tag, Select } from "antd";

import InstructorService from "../../services/Instructor.service";
import PublicService from "../../services/Public.service";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setForumID } from "../../redux/features/globalState";

const InforCourse = () => {
  const { courseID } = useParams();
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      CourseService.getCourseDetail(courseID).then((res) => {
        setData(res.data[0]);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, [courseID]);
  console.log(data);

  const createForum = async () => {
    const res = await PublicService.Forum.createDisForum(courseID);
    if (res.status === 200) {
      console.log("Create forum success");
    }
  };
  const goToForum = async () => {
    dispatch(setForumID(courseID));
    navigate(`/discussion`);
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
        <Button type="primary" onClick={goToForum}>
          Go to Forum
        </Button>{" "}
        <Button type="primary" onClick={createForum}>
          Create Forum
        </Button>
      </div>
    </div>
  );
};
const CreateLesson = () => {
  const { courseID, lessonID } = useParams();
  const navigate = useNavigate();
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
              navigate(`/new-course/${courseID}/create-lesson/`);
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
