import React, { useState } from "react";
import ItemInput from "../other/ItemInput";
import { useSelector } from "react-redux";

const EducationItem = (props) => {
  const { educationID, level, marjor, schoolName, userID } = props;
  const [formData, setFormData] = useState({
    educationID: educationID,
    level: level,
    marjor: marjor,
    schoolName: schoolName,
    userID: userID,
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
          label="Level"
          type="text"
          name="level"
          placeholder="Enter Level"
          value={formData.level}
          setValue={setFormData}
          isEditable={isEditable}
        />
        <ItemInput
          label="Major"
          type="text"
          name="major"
          placeholder="Enter Major"
          value={formData.marjor}
          setValue={setFormData}
          isEditable={isEditable}
        />
        <ItemInput
          label="School Name"
          type="text"
          name="schoolName"
          placeholder="Enter School Name"
          value={formData.schoolName}
          setValue={setFormData}
          isEditable={isEditable}
        />
      </form>
    </div>
  );
};

const Education = () => {
  const educationArr = useSelector((state) => state.profile.Education) || [];

  return (
    <>
      <div className="flex gap-10 min-h-[300px]">
        <div className="card bg-base-100 shadow-xl shadow-gray-200 rounded-xl w-1/2 p-6">
          {/* Component add company item */}
        </div>
        <div className="card bg-base-100 shadow-xl shadow-gray-200 rounded-md p-2 w-1/2 gap-4">
          <h1>List of Education</h1>
          {educationArr.length === 0 && (
            <div className="flex justify-center items-center h-52">
              <h1 className="text-2xl text-gray-500">No Education</h1>
            </div>
          )}
          {educationArr?.map((education, index) => (
            <EducationItem
              key={index}
              educationID={education.EducationID}
              level={education.Level}
              marjor={education.Major}
              schoolName={education.SchoolName}
              userID={education.UserID}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Education;
