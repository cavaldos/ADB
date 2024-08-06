import React from 'react'

import { Table } from "antd";
function MangerInstructorPage() {
    const dataSource = [
      {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
      },
    ];

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
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
    ];
  return (
    <div>
      MangerInstructorPage
      <div className='mx-'>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
}

export default MangerInstructorPage