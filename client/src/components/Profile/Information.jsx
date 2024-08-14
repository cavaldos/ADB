import React, { useState } from "react";
import { Card } from "antd";

const InfoDetailItem = ({ title, value }) => {
  return (
    <div className="mb-2">
      <span className="font-bold text-gray-800">{title}: </span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
};

const Information = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Alec M. Thompson",
    phoneNumber: "(44) 123 1234 123",
    email: "alecthompson@mail.com",
    location: "USA",
  });
  return (
    <>
      <div className=" flex gap-10 min-h-[300px]">
        <div className="card bg-base-100  shadow-xl shadow-gray-200 rounded-xl w-1/2 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Profile Information
          </h2>

          {/* <InfoDetailItem title="Full Name" value={formData.fullName} />
          <InfoDetailItem title="Phone Number" value={formData.phoneNumber} />
          <InfoDetailItem title="Email" value={formData.email} />
          <InfoDetailItem title="Location" value={formData.location} /> */}
        </div>
        <div className="card bg-base-100  shadow-xl shadow-gray-200 rounded-md p-2 w-1/2">
          s
        </div>
      </div>
    </>
  );
};

export default Information;
