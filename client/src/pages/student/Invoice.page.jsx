import React, { useState, useEffect } from "react";
import { Table, message, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StudentService from "../../services/Student.service";

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const profile = useSelector((state) => state.profile);
  const naviagte = useNavigate();
  const [state, setState] = useState(true);
  const fetchInvoice = async () => {
    try {
      const response = await StudentService.Invoice.getAllInvoiceByStudentID(
        profile.StudentID
      );
      setInvoiceData(response.data.type1 || []);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const payment = async (invoiceID) => {
    try {
      const response = await StudentService.Invoice.paymentInvoice(invoiceID);
      if (response.status === 200) {
        fetchInvoice();
        setState(!state);
        message.success("Payment success");
        return;
      }
      message.error("Payment failed");
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchInvoice();
  }, [state]);

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "InvoiceID",
      key: "InvoiceID",
    },
    {
      title: "Invoice Date",
      dataIndex: "InvoiceDate",
      key: "InvoiceDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Total Amount",
      dataIndex: "TotalAmount",
      key: "TotalAmount",
    },
    {
      title: "Invoice Status",
      dataIndex: "InvoiceStatus",
      key: "InvoiceStatus",
      render: (text) => {
        if (text === "Unpaied") {
          return <Tag color="orange">{text}</Tag>;
        } else if (text === "Paied") {
          return <Tag color="green">{text}</Tag>;
        }
      },
    },
    {
      title: "Transaction Time",
      dataIndex: "TransactionTime",
      key: "TransactionTime",
      render: (text) => (text ? new Date(text).toLocaleString() : "N/A"),
    },
    {
      title: "Description",
      dataIndex: "TransferDescription",
      key: "TransferDescription",
    },
    {
      title: "Full Name",
      dataIndex: "FullName",
      key: "FullName",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
    },
    {
      title: "ViewDetail",
      key: "action",
      render: (text, record) => (
        <button
          onClick={() => naviagte(`/invoice-detail/${record.InvoiceID}`)}
          className="btn btn-sm text-black bg-blue-500 px-4 py-2 rounded-md"
        >
          Detail
        </button>
      ),
    },

    {
      title: "Payment",
      key: "action",
      render: (text, record) => (
        <button
          onClick={() => payment(record.InvoiceID)}
          className="btn btn-sm text-black bg-green-400 px-4 py-2 rounded-md"
        >
          Payment
        </button>
      ),
    },
  ];

  return (
    <div className="p-8  min-h-[70vh] mx-[200px]">
      <Table
        dataSource={invoiceData}
        columns={columns}
        rowKey="InvoiceID"
        pagination={false}
      />
    </div>
  );
};

export default Invoice;
