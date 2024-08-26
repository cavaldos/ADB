import React, { useState, useEffect } from "react";
import InstructorService from "../../services/Instructor.service";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  message,
  Space,
} from "antd";
import { ConvertTime } from "../../hooks/Time.utils";
import ColumnSearch from "~/hooks/useSortTable";
import { useNavigate, useNavigation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const SearchComponent = () => {
  return (
    <div className="flex items-center border border-gray-400 ">
      <input
        type="text"
        placeholder="Search your courses"
        className="p-2 w-full outline-none"
      />
      <button className="bg-gray-700 h-full w-[50px] p-2 flex items-center justify-center text-white">
        <FaSearch className="text-2xl hover:text-gray-400" />
      </button>
    </div>
  );
};

const HistoryCourse = () => {
  const [data, setData] = useState([]);
  const profile = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { hisCourseID } = useParams();

  const fetchCourses = async () => {
    try {
      const response = await InstructorService.historyCourse(hisCourseID);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [loading, hisCourseID]);

  const columns = [
    {
      title: "CourseID",
      dataIndex: "CourseID",
      key: "CourseID",
      sorter: (a, b) => a.CourseID - b.CourseID,
    },
    {
      title: "Version",
      dataIndex: "Version",
      key: "Version",
      sorter: (a, b) => a.Version - b.Version,
    },
    {
      title: "CourseHistoryID",
      dataIndex: "CourseHistoryID",
      key: "CourseHistoryID",
      sorter: (a, b) => a.CourseHistoryID - b.CourseHistoryID,
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
      ...ColumnSearch("Title"),
    },

    {
      title: "UpdateTime",
      dataIndex: "UpdateTime",
      key: "UpdateTime",
      render: (text) => ConvertTime.convertTimeToHHMM(text),
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
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      // sort
      sorter: (a, b) => a.Price - b.Price,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (text) => {
        if (text === "Free") {
          return <Tag color="green">{text}</Tag>;
        } else if (text === "Plus") {
          return <Tag color="blue">{text}</Tag>;
        } else {
          return <Tag color="red">{text}</Tag>;
        }
      },
    },
    {
      title: "HistoryMessage",
      dataIndex: "HistoryMessage",
      key: "HistoryMessage",
    },
  ];

  return (
    <div className="flex flex-col gap-7 min-h-full">
      <div className="h-12 flex items-center gap-4">
        {/* <SearchComponent />
        <button
          onClick={() => navigate("/new-course")}
          className="bg-[#A535F0] h-full w-[120px] ml-auto text-white font-bold"
        >
          New Course
        </button> */}
      </div>

      <div className="bg-gray-300 p-2 overflow-x-auto rounded-md">
        <Table
          columns={columns}
          tableLayout="auto"
          dataSource={data?.map((item, index) => ({ ...item, key: index }))}
        />
      </div>
    </div>
  );
};

export default HistoryCourse;
