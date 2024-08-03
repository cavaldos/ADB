import React from "react";
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
            <li className="mb-2">
              <button className="w-full text-left">Module 2</button>
            </li>
            <li className="mb-2">
              <button className="w-full text-left">Module 3</button>
            </li>
            <li className="mb-2">
              <button className="w-full text-left bg-blue-100">Module 4</button>
            </li>
          </ul>
        </li>
        <li className="mb-4">
          <button className="w-full text-left py-2 px-4">Grades</button>
        </li>
        <li className="mb-4">
          <button className="w-full text-left py-2 px-4">Notes</button>
        </li>
        <li className="mb-4">
          <button className="w-full text-left py-2 px-4">
            Discussion Forums
          </button>
        </li>
        <li className="mb-4">
          <button className="w-full text-left py-2 px-4">Messages</button>
        </li>
        <li className="mb-4">
          <button className="w-full text-left py-2 px-4">Course Info</button>
        </li>
      </ul>
    </div>
  );
};

const CourseContent = () => {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Application Project</h2>
      <p className="text-sm text-gray-600 mb-4">
        10 min of readings left | 2 graded assessments left
      </p>
      <p className="text-gray-800 mb-4">
        The Pre-Collegiate application project is the final module of the
        English and Academic Preparation Program. In this module, you will not
        learn new information as you did in the previous modules, but rather
        apply the knowledge and skills you learned from the other modules in
        this academic certificate in order to complete a series of four tasks.
      </p>
      <button className="text-blue-600 mb-6">Show Learning Objectives</button>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Step 1: Reading and Writing</h3>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p>Write About It</p>
            <p className="text-sm text-gray-500">Due, Jul 5, 11:59 PM PDT</p>
          </div>
          <button className="bg-gray-200 text-gray-600 px-2 py-1 rounded">
            1 graded assessment left
          </button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p>Write About It</p>
            <p className="text-sm text-gray-500">Due, Jul 8, 11:59 PM PDT</p>
          </div>
          <button className="bg-gray-200 text-gray-600 px-2 py-1 rounded">
            Review Your Peers
          </button>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Step 2: Listening and Speaking</h3>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p>Speak About It</p>
            <p className="text-sm text-gray-500">Due, Jul 5, 11:59 PM PDT</p>
          </div>
          <button className="bg-gray-200 text-gray-600 px-2 py-1 rounded">
            1 graded assessment left
          </button>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p>Speak About It</p>
            <p className="text-sm text-gray-500">Due, Jul 8, 11:59 PM PDT</p>
          </div>
          <button className="bg-gray-200 text-gray-600 px-2 py-1 rounded">
            Review Your Peers
          </button>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Learn More</h3>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p>What's Next?</p>
            <p className="text-sm text-gray-500">Reading • 10 min</p>
          </div>
        </div>
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
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-1h2v1zm0-3H9V5h2v5z" />
          </svg>
          Start date: March 19, 2024 PDT
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-1h2v1zm0-3H9V5h2v5z" />
          </svg>
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
        <div className="mb-2">
          <a href="#" className="text-blue-600">
            Making Predictions
          </a>
          <p className="text-sm text-gray-500">Due Sep 27, 11:59 PM PDT</p>
        </div>
      </div>
    </div>
  );
};
const CourseDetail = () => {
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

export default CourseDetail;
