import React, { useState } from "react";
import axios from "axios";

const SearchComponent = () => {
  return (
    <div className="flex items-center border border-gray-400 ">
      <input
        type="text"
        placeholder="Search your courses"
        className="p-2 w-full outline-none"
      />
      <button className="bg-gray-700 h-full w-[50px] p-2 flex items-center justify-center text-white">
        dfg
      </button>
    </div>
  );
};
const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    subtitle: "",
    description: "",
    language: "English",
    image: "",
    price: "",
    status: "Hide",
    categoryID: "",
    instructorID: "",
  });

  return (
    <div className="flex flex-col gap-7 min-h-full">
      <div className="h-12 flex items-center gap-4">
        <SearchComponent />
        <button className="bg-[#A535F0] h-full w-[120px] ml-auto text-white font-bold">
          New Course
        </button>
      </div>
      <div className="flex h-[175px] w-full border-2 bg-[#f0f2f4] p-3">
        New course
      </div>
    </div>
  );
};

export default CreateCourse;
