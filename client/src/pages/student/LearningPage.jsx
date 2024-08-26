import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StudentSetvice from "../../services/Student.service";
import { message, Table } from "antd";
import { useNavigate } from "react-router-dom";
const Learning = () => {
  const [activeTab, setActiveTab] = useState("in-progress");

  const profile = useSelector((state) => state.profile);
  const [learnReady, setLearnReady] = useState([]);

  const fetchLeaarnReady = async () => {
    const response = await StudentSetvice.Learn.getLearnReady(
      profile.StudentID
    );
    if (response.status === 200) {
      setLearnReady(response.data);
    }
  };
  const naviagte = useNavigate();
  const startLearn = async (CourseID) => {
    const response = await StudentSetvice.Learn.startLearnProcess(
      profile.StudentID,
      CourseID
    );
    if (response.status === 200) {
      message.success("Start learning successfully");
      naviagte(`learn-process/${response.data.LearnProcessID}`);
      fetchLeaarnReady();
    }
  };

  useEffect(() => {
    fetchLeaarnReady();
  }, []);

  const columns = [
    {
      title: "Course ID",
      dataIndex: "CourseID",
      key: "CourseID",
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Subtitle",
      dataIndex: "Subtitle",
      key: "Subtitle",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Language",
      dataIndex: "Language",
      key: "Language",
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Create Time",
      dataIndex: "CreateTime",
      key: "CreateTime",
    },
    {
      title: "Instructor ID",
      dataIndex: "InstructorID",
      key: "InstructorID",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (text, record) => (
        <button
          onClick={() => startLearn(record.CourseID)}
          className="btn btn-sm bg-green-500 text-white hover:text-black"
        >
          Start Learn
        </button>
      ),
    },
  ];

  return (
    <div className="p-8 mx-6">
      <h1 className="text-3xl font-bold mb-6">My Learning</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("in-progress")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "in-progress"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "completed"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Completed
        </button>
      </div>
      <div className="">
        {activeTab === "in-progress" ? (
          <div className="bg-red-200">
            <Table
              columns={columns}
              dataSource={learnReady}
              pagination={false}
            />
          </div>
        ) : (
          <div className="">
            {/* <h1>completed</h1>
            <h1>completed</h1> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Learning;
