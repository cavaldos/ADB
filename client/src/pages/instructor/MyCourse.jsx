import React, { useState, useEffect } from "react";
import InstructorService from "../../services/Instructor.service";
import axios from "axios";
import { Space, Table, Tag } from "antd";
import ColumnSearch from "~/hooks/useSortTable";
import { useNavigate, useNavigation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

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

const CreateCourse = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   InstructorService.getAllCOurseByInstructor(1)
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    // Replace API call with demo data
    const demoData = [
      {
        CourseID: 1,
        CategoryName: "React",
        CreateTime: "2021-09-01",
        Description: "Learn the basics of React",
        Language: "English",
        Price: "$50",
        FullName: "John Doe",
        Status: "Published",
        Title: "Introduction to React",
      },
      {
        CourseID: 2,
        CategoryName: "Node.js",
        CreateTime: "2021-10-15",
        Description: "Master backend development with Node.js",
        Language: "English",
        Price: "$70",
        FullName: "Jane Smith",
        Status: "Published",
        Title: "Node.js Mastery",
      },
      {
        CourseID: 3,
        CategoryName: "Python",
        CreateTime: "2021-11-10",
        Description: "Python for beginners",
        Language: "English",
        Price: "$60",
        FullName: "Alice Johnson",
        Status: "Draft",
        Title: "Python 101",
      },
    ];

    setData(demoData);
  }, []);
  const columns = [
    {
      title: "CourseID",
      dataIndex: "CourseID",
      key: "CourseID",
    },
    {
      title: "CategoryName",
      dataIndex: "CategoryName",
      key: "CategoryName",
    },
    {
      title: "CreateTime",
      dataIndex: "CreateTime",
      key: "CreateTime",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    // {
    //   title: "Image",
    //   dataIndex: "Image",
    //   key: "Image",
    // },
    {
      title: "Language",
      dataIndex: "Language",
      key: "Language",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "FullName",
      dataIndex: "FullName",
      key: "FullName",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Manage",
      key: "action",
      fixed: "center",
      render: (text, record) => (
        <Space size="middle">
          <button
            onClick={() => navigate(`/edit-course/${record.CourseID}`)}
            className="btn btn-xs bg-gray-300 "
          >
            Edit Course
          </button>
          <button
            onClick={() => navigate(`/new-course/${1}/create-lesson`)}
            className="btn btn-xs bg-gray-300 "
          >
            Edit Lesson
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-7 min-h-full">
      <div className="h-12 flex items-center gap-4">
        <SearchComponent />
        <button
          onClick={() => navigate("/new-course")}
          className="bg-[#A535F0] h-full w-[120px] ml-auto text-white font-bold"
        >
          New Course
        </button>
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

export default CreateCourse;
