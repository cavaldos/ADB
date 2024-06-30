import React from "react";

import CourseDetail from "./test";
const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Rice University</h2>
      <h3 className="text-md font-semibold mb-6">
        English and Academic Preparation - Pre-Collegiate
      </h3>
      <ul>
        <li className="mb-4">
          <button className="w-full text-left py-2 px-4 bg-gray-200 rounded">
            Course Material
          </button>
          <ul className="ml-4 mt-2">
            <li className="mb-2">
              <button className="w-full text-left">Module 1</button>
            </li>
          </ul>
        </li>
        <li className="mb-4">
          <button className="w-full text-left py-2 px-4">Grades</button>
        </li>
      </ul>
    </div>
  );
};

const CourseContent = () => {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg ">
      <h2 className="text-xl font-bold mb-4">Application Project</h2>
      <CourseDetail />
      <CourseDetail />
      <p className="text-sm text-gray-600 mb-4">
        10 min of readings left | 2 graded assessments left
      </p>

      <div className="flex justify-between bg-red-900">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Continue
        </button>
        <button className="text-blue-600">Ask for help</button>
      </div>
    </div>
  );
};
const Schedule = () => {
  return (
    <div className="w-72 bg-white shadow-md p-4">
      <h3 className="text-lg font-bold mb-4">Schedule</h3>
      <div className="text-sm text-gray-600 mb-4">
        <div className="flex items-center mb-2">
          Start date: March 19, 2024 PDT
        </div>
        <div className="flex items-center">
          Estimated end date: October 12, 2024 PDT
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">No weekly goal set</p>
        <div className="flex space-x-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <button
              key={index}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
            >
              {day}
            </button>
          ))}
        </div>
        <button className="text-blue-600 mt-2">Set goal</button>
      </div>
      <div>
        <h4 className="font-bold mb-2">Upcoming</h4>
        <div className="mb-2">
          <a href="#" className="text-blue-600">
            Meet Your Classmates
          </a>
          <p className="text-sm text-gray-500">Due Sep 27, 11:59 PM PDT</p>
        </div>
      </div>
    </div>
  );
};
const LearningProcess = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <CourseContent />
      </div>
      <Schedule />
    </div>
  );
};

export default LearningProcess;
