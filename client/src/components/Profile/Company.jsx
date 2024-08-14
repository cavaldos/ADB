import React, { useState } from "react";
import ItemInput from "../other/ItemInput";

const CompanyItem = ({ companyID, companyName = "", bankName = "" }) => {
  const [formData, setFormData] = useState({
    companyID: companyID,
    companyName: companyName,
    bankName: bankName,
  });

  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setIsEditable(false);
  };
  const handleRemove = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setIsEditable(false);
  }
  return (
    <div className="bg-[#F8F9FA] rounded-md w-full min-h-[150px] p-2">
      <div className="form-control w-52 mb-4 flex flex-row justify-end gap-4 items-center ml-auto h-[34px]">
        {loading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        <button
          type="submit"
          onClick={handleRemove}
          className={`bg-red-600  text-white btn btn-sm text-bl py-1 px-4 rounded hover:bg-red-700
                   transform transition-all duration-500 ease-in-out
                    ${
                      !isEditable ? "opacity-50 cursor-not-allowed hidden" : ""
                    }`}
          disabled={!isEditable}
        >
          Remove
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className={`bg-gray-300  btn btn-sm text-bl py-1 px-4 rounded
                   transform transition-all duration-500 ease-in-out
                    ${
                      !isEditable ? "opacity-50 cursor-not-allowed hidden" : ""
                    }`}
          disabled={!isEditable}
        >
          Update
        </button>
        <input
          type="checkbox"
          className="toggle toggle-accent "
          checked={isEditable}
          onChange={() => setIsEditable(!isEditable)}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <ItemInput
          label="Company Name"
          type="text"
          name="companyName"
          placeholder="Enter Company Name"
          value={formData.companyName}
          setValue={setFormData}
          isEditable={isEditable}
        />
        <ItemInput
          label="Bank Name"
          type="text"
          name="bankName"
          placeholder="Enter Bank Name"
          value={formData.bankName}
          setValue={setFormData}
          isEditable={isEditable}
        />
      </form>
    </div>
  );
};

const Company = () => {
  const companies = [
    { id: 1, companyName: "Company 1", bankName: "Bank 1" },
    { id: 2, companyName: "Company 2", bankName: "Bank 2" }, // Sử dụng ID khác nhau
  ];
  return (
    <>
      <div className="flex gap-10 min-h-[300px]">
        <div className="card bg-base-100 shadow-xl shadow-gray-200 rounded-xl w-1/2 p-6">
          {/* Component add company item */}
        </div>
        <div className="card bg-base-100 shadow-xl shadow-gray-200 rounded-md p-2 w-1/2 gap-4">
          <h1>List of Companies</h1>
          {companies.map((company,index) => (
            <CompanyItem
              key={index}
              companyID={company.id}
              companyName={company.companyName}
              bankName={company.bankName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Company;
