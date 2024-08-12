import React, { useState } from "react";
import { MdOndemandVideo } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { SiSpeedtest } from "react-icons/si";
import { MdCreateNewFolder } from "react-icons/md";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Tab,
} from "@mui/material";
import TabMenu from "../../components/other/TabMenu";
import CreateLessonVideo from "../../components/Lesson/LessonVideo";
import CreateLessonDocument from "../../components/Lesson/LessonDocument";
import CreateLessonTest from "../../components/Lesson/LessonTest";
import LessonItemList from "../../components/Lesson/LessonItemList";
import LessonDrag from "../../components/Lesson/LessonDrag";
import LessonService from "../../components/Lesson/LessonService";

const InforCourse = () => {
  return (
    <div className="bg-red-100">
      <h1>Course</h1>
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
          <div className="bg-red-200 w-full h-full">khanh</div>
        </div>
      ) : (
        <div>
          <TabMenu tabs={tabs} />
        </div>
      )}
    </div>
  );
};

const LessonList = () => {
  const [activeTab, setActiveTab] = useState("details");
  const LessonDetailList = () => {
    return (
      <div className="flex flex-col gap-2 text-black">
        <LessonItemList />
        <LessonItemList />
        <LessonItemList />
      </div>
    );
  };
  const LessonSortList = () => {
    return (
      <div className="flex flex-col gap-2 text-black">
        <LessonDrag />
      </div>
    );
  };
  const tabs = [
    {
      id: 1,
      name: "Lesson Detail",
      Element: <LessonDetailList />,
    },
    {
      id: 2,
      name: "Sort Lesson",
      Element: <LessonSortList />,
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
