import React, { useEffect, useState } from "react";
import { Table, Tag, Modal, Button, Select, Form, message } from "antd";
import AdminService from "../../services/Admin.service";
import { ConvertTime } from "../../hooks/Time.utils";

function MangerInstructorPage() {
  const [instructors, setInstructors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [form] = Form.useForm();

  const fetchInstructors = async () => {
    try {
      const res = await AdminService.getAllInstructor();
      setInstructors(
        res.data.map((instructor, index) => ({
          key: index.toString(),
          userID: instructor.UserID,
          userName: instructor.UserName,
          password: instructor.Password,
          email: instructor.Email,
          fullName: instructor.FullName,
          phone: instructor.Phone,
          address: instructor.Address,
          role: instructor.Role,
          createdTime: instructor.CreatedTime,
          updateTime: instructor.UpdateTime,
          instructorID: instructor.InstructorID,
          level: instructor.Level,
          status: instructor.Status,
        }))
      );
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const showEditModal = (instructor) => {
    setSelectedInstructor(instructor);
    form.setFieldsValue({
      level: instructor.level,
      status: instructor.status,
    });
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    form.validateFields().then((values) => {
      const updatedInstructor = {
        ...selectedInstructor,
        level: values.level,
        status: values.status,
      };

      AdminService.upDateInstructor(
        updatedInstructor.instructorID,
        updatedInstructor.level,
        updatedInstructor.status
      )
        .then((res) => {
          if (res.status === 200) {
            fetchInstructors();
            message.success("Update successfully!");
          }
        })
        .catch((error) => {
          console.error("Failed:", error);
        });

      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "userID",
      key: "userID",
    },
    {
      title: "Instructor ID",
      dataIndex: "instructorID",
      key: "instructorID",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Created Time",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (text) => ConvertTime.convertTimeToHHMM(text),
    },
    {
      title: "Updated Time",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (text) => ConvertTime.convertTimeToHHMM(text),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (level) => {
        return level === "Beginner" ? (
          <Tag color="green">{level}</Tag>
        ) : level === "Intermediate" ? (
          <Tag color="blue">{level}</Tag>
        ) : (
          <Tag color="red">{level}</Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return status === "Pending" ? (
          <Tag color="green">{status}</Tag>
        ) : (
          <Tag color="blue">{status}</Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => showEditModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Manager Instructor Page</h1>
      <div className="mx-auto overflow-x-auto">
        <Table
          dataSource={instructors}
          columns={columns}
          pagination={false}
          scroll={{ x: true }}
        />
      </div>
      <Modal
        title="Edit Instructor"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="level"
            label="Level"
            rules={[{ required: true, message: "Please select a level!" }]}
          >
            <Select>
              <Select.Option value="Beginner">Beginner</Select.Option>
              <Select.Option value="Intermediate">Intermediate</Select.Option>
              <Select.Option value="Advanced">Advanced</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MangerInstructorPage;
