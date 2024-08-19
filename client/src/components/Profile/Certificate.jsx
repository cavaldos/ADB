import React, { useState } from "react";
import ItemInput from "../other/ItemInput";
import { useSelector } from "react-redux";
import { ConvertTime } from "../../hooks/Time.utils";
const CertificateItem = (props) => {
  const { certificateID, certificateName, startDate, endDate, instructorID } =
    props;

  const [formData, setFormData] = useState({
    certificateID: certificateID,
    certificateName: certificateName,
    startDate: startDate,
    endDate: endDate,
    instructorID: instructorID,
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
          label="Certificate Name"
          type="text"
          name="certificateName"
          placeholder="Enter Certificate Name"
          value={formData.certificateName}
          setValue={setFormData}
          isEditable={isEditable}
        />
        <ItemInput
          label="Start Date"
          type="text"
          name="startDate"
          placeholder="Enter Start Date"
          value={formData.startDate}
          setValue={setFormData}
          isEditable={isEditable}
        />
        <ItemInput
          label="End Date"
          type="text"
          name="endDate"
          placeholder="Enter End Date"
          value={formData.endDate}
          setValue={setFormData}
          isEditable={isEditable}
        />
      </form>
    </div>
  );
};

const Certificate = () => {
  const certificateArr =
    useSelector((state) => state.profile.Certificates) || [];
  return (
    <>
      <div className="flex gap-10 min-h-[300px]">
        <div className="card bg-base-100 shadow-xl shadow-gray-200 rounded-xl w-1/2 p-6">
          {/* Component add company item */}
        </div>
        <div className="card bg-base-100 shadow-xl shadow-gray-200 rounded-md p-2 w-1/2 gap-4">
          <h1>List of Companies</h1>
          {certificateArr?.map((certificare, index) => (
            <CertificateItem
              key={index}
              certificateID={certificare.CertificateID}
              certificateName={certificare.CertificateName}
              startDate={ConvertTime.convertDateToDDMMYYYY(
                certificare.StartDate
              )}
              endDate={ConvertTime.convertDateToDDMMYYYY(certificare.EndDate)}
              instructorID={certificare.InstructorID}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Certificate;
