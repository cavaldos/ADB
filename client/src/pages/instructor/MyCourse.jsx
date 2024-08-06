import React, { useState } from "react";
import axios from "axios";
import { Space, Table, Tag } from "antd";

const SearchComponent = () => {
  return (
    <div className="flex items-center border border-gray-400 ">
      <input
        type="text"
        placeholder="Search your courses"
        className="p-2 w-full outline-none"
      />
      <button className="bg-gray-700 h-full w-[50px] p-2 flex items-center justify-center text-white">
        dfg
      </button>
    </div>
  );
};
const CreateCourse = () => {
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
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <div className="flex flex-col gap-7 min-h-full">
      <div className="h-12 flex items-center gap-4">
        <SearchComponent />
        <button className="bg-[#A535F0] h-full w-[120px] ml-auto text-white font-bold">
          New Course
        </button>
      </div>
      <div className="flex h-[175px] w-full border-2 bg-[#f0f2f4] p-3">
        New course
      </div>
      <div className="bg-gray-300 pt-2">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default CreateCourse;
