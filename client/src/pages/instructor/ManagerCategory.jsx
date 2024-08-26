import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import InstructorService from "../../services/Instructor.service";

function ManagerCategory() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false); // For distinguishing between create and edit mode

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    InstructorService.Category.getAllCategory()
      .then((res) => {
        setCategory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        message.error("Failed to load categories");
        setLoading(false);
        console.error(err);
      });
  };

  const showEditModal = (record) => {
    setEditingCategory(record);
    setIsCreateMode(false);
    setIsModalVisible(true);
  };

  const showCreateModal = () => {
    setEditingCategory(null);
    setIsCreateMode(true);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
  };

  const handleUpdate = async (values) => {
    try {
      const response = await InstructorService.Category.updateCategory(
        editingCategory.CategoryID,
        values.categoryName,
        values.categoryDescription,
        values.parentCategoryID
      );

      if (response.status === 200) {
        message.success("Category updated successfully!");
        setIsModalVisible(false);
        fetchCategories(); // Reload categories after update
      } else {
        message.error("Failed to update category.");
      }
    } catch (error) {
      message.error("An error occurred while updating the category.");
      console.error(error);
    }
  };

  const handleCreate = async (values) => {
    try {
      const response = await InstructorService.Category.createCategory(
        values.categoryName,
        values.categoryDescription,
        values.parentCategoryID
      );

      if (response.status === 200) {
        message.success("Category created successfully!");
        setIsModalVisible(false);
        fetchCategories(); // Reload categories after creation
      } else {
        message.error("Failed to create category.");
      }
    } catch (error) {
      message.error("An error occurred while creating the category.");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Category ID",
      dataIndex: "CategoryID",
      key: "CategoryID",
    },
    {
      title: "Category Name",
      dataIndex: "CategoryName",
      key: "CategoryName",
    },
    {
      title: "Description",
      dataIndex: "CategoryDescription",
      key: "CategoryDescription",
    },
    {
      title: "Parent Category ID",
      dataIndex: "ParentCategoryID",
      key: "ParentCategoryID",
      render: (text) => (text ? text : "None"), // Display 'None' if ParentCategoryID is null
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => showEditModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={showCreateModal}
      >
        Create Category
      </Button>

      <Table
        dataSource={category}
        columns={columns}
        rowKey="CategoryID"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={isCreateMode ? "Create Category" : "Edit Category"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={isCreateMode ? handleCreate : handleUpdate}
          initialValues={
            editingCategory
              ? {
                  categoryName: editingCategory.CategoryName,
                  categoryDescription: editingCategory.CategoryDescription,
                  parentCategoryID: editingCategory.ParentCategoryID,
                }
              : {}
          }
        >
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[
              { required: true, message: "Please enter the category name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="categoryDescription"
            label="Category Description"
            rules={[
              {
                required: true,
                message: "Please enter the category description",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="parentCategoryID" label="Parent Category ID">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isCreateMode ? "Create Category" : "Update Category"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagerCategory;
