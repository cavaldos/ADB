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
  const profile = useSelector((state) => state.profile);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Use Form hook

  const showEditModal = (course) => {
    console.log(course);
    setSelectedCourse(course);
    form.setFieldsValue({
      // Set form values with selected course data
      title: course.Title,
      subtitle: course.Subtitle,
      description: course.Description,
      language: course.Language,
      image: course.Image,
      price: course.Price,
      status: course.Status,
      categoryID: course.CategoryID,
      historyMessage: "", // Reset or set to an empty string for a new history message
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCourse(null);
    form.resetFields(); // Reset form fields on cancel
  };

  const fetchCourses = async () => {
    try {
      const response = await InstructorService.getAllCOurseByInstructor(
        profile.InstructorID
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();

    InstructorService.Category.getAllCategory()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {});
  }, []);

  const handleUpdate = async (values) => {
    try {
      const response = await InstructorService.updateCourse(
        selectedCourse.CourseID,
        values.title,
        values.subtitle,
        values.description,
        values.language,
        values.image,
        values.price,
        values.status,
        values.historyMessage
      );
      if (response.status === 200) {
        message.success("Course updated successfully!");
        setIsModalVisible(false);
        fetchCourses(); // Reload courses after update
      } else {
        message.error("Failed to update course.");
      }
    } catch (error) {
      message.error("An error occurred while updating the course.");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "CourseID",
      dataIndex: "CourseID",
      key: "CourseID",
      sorter: (a, b) => a.CourseID - b.CourseID,
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
      ...ColumnSearch("Title"),
    },
    {
      title: "CategoryName",
      dataIndex: "CategoryName",
      key: "CategoryName",
      ...ColumnSearch("CategoryName"),
    },
    {
      title: "CreateTime",
      dataIndex: "CreateTime",
      key: "CreateTime",
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
      title: "FullName",
      dataIndex: "FullName",
      key: "FullName",
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
      title: "Manage",
      key: "manage",
      fixed: "center",
      render: (text, record) => (
        <Space size="middle">
          <button
            onClick={() =>
              navigate(`/new-course/${record.CourseID}/create-lesson`)
            }
            className="btn btn-xs bg-gray-300 "
          >
            Edit Lesson
          </button>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button className="btn btn-sm" onClick={() => showEditModal(record)}>
          Edit
        </button>
      ),
    },
    {
      title: "View History",
      key: "history",
      render: (_, record) => {
        return (
          <button
            className="btn btn-sm"
            onClick={() => navigate(`/history-course/${record.CourseID}`)}
          >
            View
          </button>
        );
      },
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

        <Modal
          title="Edit Course"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {selectedCourse && (
            <Form layout="vertical" form={form} onFinish={handleUpdate}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  { required: true, message: "Please enter the course title" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="subtitle"
                label="Subtitle"
                rules={[
                  {
                    required: true,
                    message: "Please enter the course subtitle",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter the course description",
                  },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image URL"
                rules={[
                  {
                    required: false,
                    message: "Please enter the course image URL",
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>

              <Form.Item
                name="language"
                label="Language"
                rules={[
                  {
                    required: true,
                    message: "Please select the course language",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="English">English</Select.Option>
                  <Select.Option value="Vietnamese">Vietnamese</Select.Option>
                  <Select.Option value="Spanish">Spanish</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: "Please select the course status",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="Hide">Hide</Select.Option>
                  <Select.Option value="Free">Free</Select.Option>
                  <Select.Option value="Plus">Plus</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  { required: true, message: "Please enter the course price" },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              {/* <Form.Item
                name="categoryID"
                label="Category"
                rules={[
                  {
                    required: true,
                    message: "Please select the course category",
                  },
                ]}
              >
                <Select>
                  {categories.map((category) => (
                    <Select.Option
                      key={category.CategoryID}
                      value={category.CategoryID}
                    >
                      {category.CategoryName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item> */}

              <Form.Item
                name="historyMessage"
                label="History Message"
                rules={[
                  {
                    required: true,
                    message: "Please enter the history message",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  {loading ? "Updating..." : "Update Course"}
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CreateCourse;
