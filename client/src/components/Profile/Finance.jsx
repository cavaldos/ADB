import React, { useState, useEffect } from "react";
import Visa from "../Finance/Visa";
import VisaCard from "../Finance/VisaCard";
import ItemInput from "../other/ItemInput";
import PublicService from "../../services/Public.service";
import { useSelector } from "react-redux";
import { Modal, Button, Form, Input, message } from "antd";

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
    setIsModalVisible(true);
    console.log(formData);

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
        <button
          type="submit"
          onClick={handleRemove}
          className={`bg-red-600 text-white btn btn-sm text-bl py-1 px-4 rounded hover:bg-red-700
                   transform transition-all duration-500 ease-in-out ${
                     !isEditable ? "opacity-50 cursor-not-allowed hidden" : ""
                   }`}
          disabled={!isEditable}
        >
          Remove
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
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

  useEffect(() => {
    PublicService.Banking.getBankAccount(profile.UserID).then((res) => {
      setFormData(res.data[0]);
    });
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10 min-h-[300px]">
        <div className="card bg-base-100 shadow-xl shadow-gray-200 rounded-xl w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Edit Your Finance Information
          </h2>
          <FinanceItem
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
        <div className="card bg-base-100 shadow-xl shadow-gray-200 rounded-xl w-3/4 p-4 gap-3">
          <h1 className="mb-5 text-[#384664] text-[16px] ">
            Billing Information
          </h1>
          <div className="bg-[#F8F9FA] rounded-md w-full min-h-[150px] p-2">
            ds
          </div>
          <div className="bg-[#F8F9FA] rounded-md w-full min-h-[150px] p-2">
            ds
          </div>
          <div className="bg-[#F8F9FA] rounded-md w-full min-h-[150px] p-2">
            ds
          </div>
          {/* <VisaCard /> */}
        </div>
        <div className="card bg-base-100 shadow-xl shadow-gray-200 rounded-xl w-1/4 p-6"></div>
      </div>
    </div>
  );
};

export default Finance;
