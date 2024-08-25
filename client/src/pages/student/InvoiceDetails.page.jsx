import React, { useState, useEffect } from "react";
import { Table, Button, Input, Space, Modal, message } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StudentService from "../../services/Student.service";

const InvoiceDetail = () => {
  const [invoiceDetailData, setInvoiceDetailData] = useState([]);
  const [selectedInvoiceDetailID, setSelectedInvoiceDetailID] = useState(null); // State to hold selected invoice detail ID
  const [discountCode, setDiscountCode] = useState(""); // State to hold discount code input
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const profile = useSelector((state) => state.profile);
  const { invoiceID } = useParams();

  const fetchInvoiceDetails = async () => {
    try {
      const res = await StudentService.Invoice.getInvoiceDetails(invoiceID);
      if (res.status === 200) {
        setInvoiceDetailData(res.data || []);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const deleteInvoiceDetail = async (invoiceDetailID) => {
    try {
      const res = await StudentService.Invoice.deleteInvoiceDetail(
        invoiceDetailID
      );
      if (res.status === 200) {
        message.success("Deleted successfully");
        fetchInvoiceDetails();
      }
    } catch (error) {
      message.error("Error deleting data");
      console.error("Error deleting data: ", error);
    }
  };

  const applyDiscountCode = async () => {
    try {
      const res = await StudentService.Invoice.applyDiscountCode(
        discountCode,
        selectedInvoiceDetailID
      );
      if (res.status === 200) {
        message.success("Discount applied successfully");
        fetchInvoiceDetails();
        handleCancel(); // Close the modal after applying the discount
      }
    } catch (error) {
      message.error("Error applying discount");
      console.error("Error applying discount: ", error);
    }
  };

  const showModal = (invoiceDetailID) => {
    setSelectedInvoiceDetailID(invoiceDetailID);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setDiscountCode(""); // Clear the discount code when the modal is closed
  };

  useEffect(() => {
    fetchInvoiceDetails();
  }, [invoiceID]);

  const detailColumns = [
    {
      title: "Course Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Discount Price",
      dataIndex: "DiscountPrice",
      key: "DiscountPrice",
    },
    {
      title: "Percentage Discount",
      dataIndex: "Percentage",
      key: "Percentage",
      render: (text) => `${text}%`,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteInvoiceDetail(record.InvoiceDetailID)}
          >
            Delete
          </button>
          <Button
            type="primary"
            onClick={() => showModal(record.InvoiceDetailID)}
          >
            Apply Discount
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-8 min-h-[70vh] mx-[200px]">
      <Table
        dataSource={invoiceDetailData}
        columns={detailColumns}
        rowKey="InvoiceDetailID"
        pagination={false}
      />

      <Modal
        title="Apply Discount Code"
        visible={isModalVisible}
        onOk={applyDiscountCode}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter Discount Code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default InvoiceDetail;
