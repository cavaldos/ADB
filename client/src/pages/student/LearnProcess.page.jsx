import React, { useEffect, useState } from "react";
import DiscussionChat from "../../components/Dicussion/DiscussionChat";

import { Avatar, Space, Flex, Progress, Table, Tag } from "antd";
import LessonItemList from "../../components/Lesson/LessonItemList";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTabSlice } from "../../redux/features/globalState";
import { MdOutlineForum } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import StudentService from "../../services/Student.service";
import { useParams } from "react-router-dom";
import {setForumID} from "../../redux/features/globalState";
const Sidebar = (props) => {
  const {
    CourseID,
    Title,
    Subtitle,
    Description,
    Language,
    Image,
    Price,
    Status,
    CreateTime,
    CategoryID,
    InstructorID,
    progressPercentage,
  } = props;

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("lesson");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    dispatch(setActiveTabSlice(tab));
    dispatch(setForumID(CourseID));

  };
  return (
    <div className="w-72 bg-white shadow-md p-4 rounded-md">
      <h2 className="text-lg font-bold mb-4 text-center">My Course Progress</h2>
      <div className="shadow-xl mb-5 rounded-md min-h-[40px] p-3 flex flex-col gap-3 ">
        <div className="mb-4">
          <h3 className="text-md font-semibold">{Subtitle}</h3>
          <p className="text-sm text-gray-600">{Description}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold">Status: {Status}</p>
          <p className="text-sm font-semibold">
            Created on: {new Date(CreateTime).toLocaleDateString()}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold">Language: {Language}</p>
          <p className="text-sm font-semibold">Price: ${Price}</p>
        </div>
      </div>
      <ul className="overflow-y-hidden">
        <li className="mb-4">
          <button
            onClick={() => handleTabClick("lesson")}
            className={`w-full btn text-left py-2 px-4 rounded text-xl ${
              activeTab === "lesson" ? "bg-gray-400 " : "bg-gray-200"
            }`}
          >
            <IoDocumentText className="" />
            Lession
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => handleTabClick("discussion")}
            className={`w-full btn text-left py-2 px-4 rounded text-xl ${
              activeTab === "discussion" ? "bg-gray-400 " : "bg-gray-200"
            }`}
          >
            <MdOutlineForum className="" />
            Discussion
          </button>
        </li>
      </ul>

      <Flex
        className=" flex flex-col justify-center align-middle items-center mt-[50px] "
        gap="small"
      >
        <Progress
          className="mx-auto shadow-2xl rounded-full"
          type="circle"
          percent={progressPercentage}
          format={(percent) => `${percent.toFixed(2)}%`}
        />
      </Flex>
    </div>
  );
};

const LeesionList = () => {
  return (
    <div className="min-w-80 bg-white shadow-md p-4 rounded-md">
      <h3 className="text-lg font-bold mb-4 text-center">List of Courses</h3>
      <LessonItemList courseID={2} />
    </div>
  );
};
const LearningProcess = () => {
  const [allLearnProcess, setAllLearnProcess] = useState([]);
  const [learnProcessDetail, setLearnProcessDetail] = useState([]);

  const { learnProcessID } = useParams();

  const profile = useSelector((state) => state.profile);
  const fetchStaticLeaProcess = async () => {
    const response = await StudentService.Learn.statisticalLearnProcess(
      profile?.StudentID,
      learnProcessID
    );
    if (response.status === 200) {
      setAllLearnProcess(response.data.allLearnProcess[0]);
      setLearnProcessDetail(response.data.learnProcessDetail);
    }
  };
  const lessonProcessTab = useSelector((state) => state.globalState.activeTab);

  useEffect(() => {
    fetchStaticLeaProcess();
  }, []);
  const updateLearnProcess = async (learnProcessID, status) => {
    
    const res = await StudentService.Learn.updateLearnProcess(
      learnProcessID,
      status,
      profile?.StudentID
    );
    if (res.status === 200) {
      fetchStaticLeaProcess();
    }
  };

  const columns = [
    {
      title: "Course ID",
      dataIndex: "CourseID",
      key: "CourseID",
    },
    {
      title: "LearnProcessID",
      dataIndex: "LearnProcessID",
      key: "LearnProcessID",
    },
    {
      title: "LessonID",
      dataIndex: "LessonsID",
      key: "LessonID",
    },

    {
      title: "Status",
      dataIndex: "StatusProcess",
      key: "StatusProcess",
      render: (status) => {
        return status === "NotStarted" ? (
          <Tag color="green">{status}</Tag>
        ) : status === "InProgress" ? (
          <Tag color="blue">{status}</Tag>
        ) : (
          <Tag color="red">{status}</Tag>
        );
      },
    },
    {
      title: "Duration",
      dataIndex: "Duration",
      key: "Duration",
    },
    {
      title: "Complexity",
      dataIndex: "ComplexityLevel",
      key: "ComplexityLevel",
    },
    {
      title: "Created Time",
      dataIndex: "CreatedTime",
      key: "CreatedTime",
    },
    {
      title: "Updated Time",
      dataIndex: "UpdatedTime",
      key: "UpdatedTime",
    },
    {
      title: "Lesson Type",
      dataIndex: "LessonType",
      key: "LessonType",
    },
    {
      title: "Topic",
      dataIndex: "Topic",
      key: "Topic",
    },
    {
      title: "Order Lesson",
      dataIndex: "OrderLesson",
      key: "OrderLesson",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (text, record) => (
        <button
          onClick={() => updateLearnProcess(record.LearnProcessID, "Done")}
          className="btn btn-sm bg-green-500 text-white hover:text-black"
        >
          Done
        </button>
      ),
    },
  ];

  return (
    <div className="flex h-[85vh] bg-gray-100 mx-4  ">
      <Sidebar
        CourseID={allLearnProcess?.CourseID}
        Title={allLearnProcess?.Title}
        Subtitle={allLearnProcess?.Subtitle}
        Description={allLearnProcess?.Description}
        Language={allLearnProcess?.Language}
        Image={allLearnProcess?.Image}
        Price={allLearnProcess?.Price}
        CreateTime={allLearnProcess?.CreateTime}
        Status={allLearnProcess?.Status}
        CategoryID={allLearnProcess?.CategoryID}
        InstructorID={allLearnProcess?.InstructorID}
        progressPercentage={allLearnProcess?.progressPercentage}
      />
      <div className=" shadow-md rounded-lg   mx-3 w-full  ">
        {lessonProcessTab === "lesson" ? (
          <Table
            columns={columns}
            dataSource={learnProcessDetail || []}
            pagination={false}
          />
        ) : (
          <DiscussionChat />
        )}
      </div>

      {/* <LeesionList /> */}
    </div>
  );
};

export default LearningProcess;
