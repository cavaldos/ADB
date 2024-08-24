import React, { useState, useEffect } from "react";
import Visa from "../Finance/Visa";
import VisaCard from "../Finance/VisaCard";
import ItemInput from "../other/ItemInput";
import PublicService from "../../services/Public.service";
import { useSelector, useDispatch } from "react-redux";
import {
  resetState,
  resetStateUpdateBankAccount,
} from "../../redux/features/resetStateSlice";
import {
  Modal,
  Button,
  Form,
  Input,
  message,
  InputNumber,
  Table,
  Tag,
} from "antd";
import { ConvertTime } from "../../hooks/Time.utils";
import ColumnSearch from "../../hooks/useSortTable";
const FinanceItem = (props) => {
  const {
    BankAccountID,
    AccountHolderName,
    AccountBalance,
    AccountNumber,
    BankName,
    UserName,
    FullName,
    Role,
  } = props;
  const [formData, setFormData] = useState({
    BankAccountID: 0,
    AccountHolderName: "",
    AccountBalance: 0,
    AccountNumber: "",
    BankName: "",
    UserName: "",
    FullName: "",
    Role: "",
  });

  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    setFormData({
      BankAccountID: BankAccountID,
      AccountHolderName: AccountHolderName,
      AccountBalance: AccountBalance,
      AccountNumber: AccountNumber,
      BankName: BankName,
      UserName: UserName,
      FullName: FullName,
      Role: Role,
    });
  }, [props]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await PublicService.Banking.updateBankAccount(
        formData.BankAccountID,
        profile.UserID,
        formData.AccountNumber,
        formData.AccountHolderName,
        formData.AccountBalance,
        formData.BankName
      );
      if (res.status === 200) {
        message.success("Update bank account successfully");
        setIsModalVisible(false);
        dispatch(resetStateUpdateBankAccount());
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsModalVisible(true);

  };
  const handleRemove = async (e) => {
    e.preventDefault();
    // Add your remove logic here
  };

  return (
    <div className="bg-[#F8F9FA] rounded-md w-full min-h-[150px] p-2">
      <div className="form-control w-52 mb-4 flex flex-row justify-end gap-4 items-center ml-auto h-[34px]">
        {loading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        {/* <button
          type="submit"
          onClick={handleRemove}
          className={`bg-red-600 text-white btn btn-sm text-bl py-1 px-4 rounded hover:bg-red-700
                   transform transition-all duration-500 ease-in-out ${
                     !isEditable ? "opacity-50 cursor-not-allowed hidden" : ""
                   }`}
          disabled={!isEditable}
        >
          Remove
        </button> */}
        <button
          type="submit"
          onClick={handleUpdate}
          className={`bg-gray-300 btn btn-sm text-bl py-1 px-4 rounded
                   transform transition-all duration-500 ease-in-out ${
                     !isEditable ? "opacity-50 cursor-not-allowed hidden" : ""
                   }`}
          disabled={!isEditable}
        >
          Update
        </button>
        <input
          type="checkbox"
          className="toggle toggle-accent"
          checked={isEditable}
          onChange={() => setIsEditable(!isEditable)}
        />
      </div>
      <p className="text-gray-600 italic">
        BankAccount ID:{formData.BankAccountID}
      </p>
      <form onSubmit={handleSubmit}>
        <ItemInput
          label="Account Number"
          type="text"
          name="AccountNumber"
          placeholder="Enter Account Number"
          value={formData.AccountNumber}
          onChange={handleInputChange}
          isEditable={isEditable}
        />
        <ItemInput
          label="Account Holder Name"
          type="text"
          name="AccountHolderName"
          placeholder="Enter Account Holder Name"
          value={formData.AccountHolderName}
          onChange={handleInputChange}
          isEditable={isEditable}
        />
        <ItemInput
          label="Account Balance $"
          type="text"
          name="AccountBalance"
          placeholder="Enter Account Balance"
          value={formData.AccountBalance}
          onChange={handleInputChange}
          isEditable={isEditable}
        />
        <ItemInput
          label="Bank Name"
          type="text"
          name="BankName"
          placeholder="Enter Bank Name"
          value={formData.BankName}
          onChange={handleInputChange}
          isEditable={isEditable}
        />
      </form>
      <Modal
        title="Edit Bank Account"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            Update
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Account Number">
            <Input
              name="AccountNumber"
              value={formData.AccountNumber}
              onChange={handleInputChange}
              disabled={!isEditable}
            />
          </Form.Item>
          <Form.Item label="Account Holder Name">
            <Input
              name="AccountHolderName"
              value={formData.AccountHolderName}
              onChange={handleInputChange}
              disabled={!isEditable}
            />
          </Form.Item>
          <Form.Item label="Account Balance">
            <Input
              name="AccountBalance"
              value={formData.AccountBalance}
              onChange={handleInputChange}
              disabled={!isEditable}
            />
          </Form.Item>
          <Form.Item label="Bank Name">
            <Input
              name="BankName"
              value={formData.BankName}
              onChange={handleInputChange}
              disabled={!isEditable}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const Finance = () => {
  const profile = useSelector((state) => state.profile);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const reset = useSelector((state) => state.resetState.updateBankAccount);
  const [amount, setAmount] = useState(0);
  const [customState, setCustomState] = useState(false);
  const [history, setHistory] = useState([]);
  const [tiggerState, setTriggerState] = useState(false);
  const [formData, setFormData] = useState({
    BankAccountID: 0,
    AccountHolderName: "",
    AccountBalance: 0,
    AccountNumber: "",
    BankName: "",
    UserName: "",
    FullName: "",
    Role: "",
  });
  const fetchHistory = async () => {
    PublicService.Banking.getHistoryBanking(formData.BankAccountID)
      .then((res) => {
        setHistory(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch history:", error);
      });
  };
  useEffect(() => {
    PublicService.Banking.getBankAccount(profile.UserID)
      .then((res) => {
        if (res.data.length > 0) {
          setFormData(res.data[0]);
        } else {
          // Handle the case when the array is empty
          setFormData({
            BankAccountID: 0,
            AccountHolderName: "",
            AccountBalance: 0,
            AccountNumber: "",
            BankName: "",
            UserName: "",
            FullName: "",
            Role: "",
          });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch bank account:", error);
      })
      .finally(() => {
        setTriggerState(!tiggerState);
      });
  }, [reset, customState]);
  useEffect(() => {
    if (formData.BankAccountID !== 0) {
      fetchHistory(); // Fetch history when formData is set
    }
  }, [formData.BankAccountID, tiggerState]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    setLoading(true);
    const response = await PublicService.Banking.createBanking(
      profile.UserID,
      values.accountNumber,
      values.accountHolderName,
      values.accountBalance,
      values.bankName
    );

    if (response && response.data) {
      setIsModalVisible(false);
      setFormData(response.data);
      dispatch(resetState());
    } else {
      // Handle error case here
      console.error(response.error);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangeAmount = async (type) => {
    try {
      if (isNaN(amount)) {
        message.error("Please enter a valid number.");
      } else {
        const res = await PublicService.Banking.transferMoney(
          formData.BankAccountID,
          amount,
          type
        );
        if (res.status === 200) {
          setCustomState(!customState);
          message.success("Transfer money successfully");
          dispatch(resetState());
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  function customToLocaleString(number) {
    if (typeof number !== "number") {
      return ""; // Return an empty string if the input is not a number
    }

    return number
      .toFixed(0) // Ensure the number has no decimal places
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas every 3 digits
  }

  const columns = [
    {
      title: "History ID",
      dataIndex: "HistoryBankingID",
      key: "HistoryBankingID",
      sorter: (a, b) => a.HistoryBankingID - b.HistoryBankingID,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      render: (amount) => {
        return <span>{customToLocaleString(amount)} $</span>;
      },
    },
    {
      title: "Transfer Content",
      dataIndex: "TransferContent",
      key: "TransferContent",
      ...ColumnSearch("TransferContent"),
    },
    {
      title: "Transfer Code",
      dataIndex: "TransferCode",
      key: "TransferCode",
    },
    {
      title: "Transfer Type",
      dataIndex: "TransferType",
      key: "TransferType",
      render: (type) => (
        <Tag color={type === "Deposit" ? "green" : "red"}>{type}</Tag>
      ),
    },
    {
      title: "Account Balance Now",
      dataIndex: "AccountBlanceNow",
      key: "AccountBlanceNow",
      render: (balance) => {
        return <span>{customToLocaleString(balance)} $</span>;
      },
      sorter: (a, b) => a.AccountBlanceNow - b.AccountBlanceNow,
      ...ColumnSearch("AccountBlanceNow"),
    },
    {
      title: "Create Time",
      dataIndex: "CreateTime",
      key: "CreateTime",
      render: (time) => ConvertTime.convertTimeToHHMM(time),
      sorter: (a, b) => new Date(a.CreateTime) - new Date(b.CreateTime),
      ...ColumnSearch("CreateTime"),
    },
  ];
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10 min-h-[300px]">
        <div className="card bg-base-100 shadow-xl shadow-gray-200 rounded-xl w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Edit Your Finance Information
          </h2>
          {formData ? (
            <FinanceItem
              BankAccountID={formData?.BankAccountID}
              AccountHolderName={formData.AccountHolderName}
              AccountBalance={formData.AccountBalance}
              AccountNumber={formData.AccountNumber}
              BankName={formData.BankName}
              UserName={formData.UserName}
              FullName={formData.FullName}
              Role={formData.Role}
            />
          ) : (
            <Button type="primary" onClick={showModal}>
              Add Account
            </Button>
          )}
          <Button type="primary" onClick={showModal}>
            Add Account
          </Button>
          <InputNumber
            placeholder="Enter Amount to Change"
            className="mt-9"
            style={{ width: "100%" }}
            type="number"
            value={amount}
            onChange={(value) => setAmount(value)}
          />

          <div className=" w-full flex gap-5  justify-center mt-5">
            <button
              className="btn btn-sm bg-green-300"
              onClick={() => handleChangeAmount("Deposit")}
            >
              Deposit
            </button>
            <button
              className="btn btn-sm bg-red-300"
              onClick={() => handleChangeAmount("Withdrawal")}
            >
              Withdrawal
            </button>
          </div>
        </div>
        <div className="rounded-md p-2 w-1/2 items-center flex justify-center">
          <Visa
            BankAccountID={formData.BankAccountID}
            AccountHolderName={formData.AccountHolderName}
            AccountBalance={formData.AccountBalance}
            AccountNumber={formData.AccountNumber}
            BankName={formData.BankName}
            UserName={formData.UserName}
            FullName={formData.FullName}
            Role={formData.Role}
          />
        </div>
      </div>
      <div className="flex gap-10 min-h-[300px]">
        <div className="card bg-base-100 shadow-xl shadow-gray-200 rounded-xl w-full  p-4 gap-3">
          <h1 className="mb-5 text-[#384664] text-[16px] ">History Banking</h1>
          <Table
            columns={columns}
            dataSource={
              history.sort((a, b) => b.HistoryBankingID - a.HistoryBankingID) ||
              []
            }
            rowKey="HistoryBankingID"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      <Modal
        title="Add Bank Account"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleOk}>
          <Form.Item
            label="Account Number"
            name="accountNumber"
            rules={[
              { required: true, message: "Please input your account number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Account Holder Name"
            name="accountHolderName"
            rules={[
              {
                required: true,
                message: "Please input the account holder name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Account Balance"
            name="accountBalance"
            rules={[
              { required: true, message: "Please input the account balance!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Bank Name"
            name="bankName"
            rules={[{ required: true, message: "Please input the bank name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Finance;
