import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StudentSetvice from "../../services/Student.service";
import { Table } from "antd";

const Learning = () => {
  const [activeTab, setActiveTab] = useState("in-progress");

  const profile = useSelector((state) => state.profile);
  const [learnReady, setLearnReady] = useState([]);
  const [statisticalLearn, setStatisticalLearn] = useState([]);

  const fetchData = async () => {
    const response = await StudentSetvice.Learn.statisticalLearnProcess(
      profile.studentID,
      1
    );
    if (response.status === 200) {
      setStatisticalLearn(response.data);
    }
  };
  const fetchLeaarnReady = async () => {
    const response = await StudentSetvice.Learn.getLearnReady(4);
    if (response.status === 200) {
      setLearnReady(response.data);
    }
  };

  useEffect(() => {
    fetchData();
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
