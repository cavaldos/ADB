import React, { useState } from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mb-6">
      <div className="flex">
        <img
          src={course.image}
          alt={course.title}
          className="w-32 h-32 object-cover"
        />
        <div className="p-4 flex-1">
          <div className="text-sm text-gray-600">
            Course | {course.provider}
          </div>
          <div className="font-bold text-xl text-blue-600 mt-2">
            {course.title}
          </div>
          <div className="text-sm text-yellow-600 mt-2">
            <svg
              className="w-4 h-4 inline mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-1h2v1zm0-3H9V5h2v5z"
                clipRule="evenodd"
              />
            </svg>
            Need more time to complete this course? Push your estimated end date
            to <span className="font-bold">{course.dueDate}</span> and achieve
            your goal.
          </div>
          <div className="mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Go To Course
            </button>
            <button className="ml-4 text-blue-600">Push end date</button>
          </div>
        </div>
      </div>
    </div>
  );
};
const Learning = () => {
  const [activeTab, setActiveTab] = useState("in-progress");

  const courses = [
    {
      image: "https://images.unsplash.com/photo-1584697964198-5db1a89e8d02",
      title: "English and Academic Preparation - Pre-Collegiate",
      provider: "Rice University",
      dueDate: "7/21/2024 PDT",
      status: "in-progress",
    },
    {
      image: "https://images.unsplash.com/photo-1584697964198-5db1a89e8d02",
      title:
        "Learning How to Learn: Powerful mental tools to help you master tough subjects",
      provider: "Deep Teaching Solutions",
      dueDate: "7/19/2024 PDT",
      status: "in-progress",
    },
    // Add more courses as needed
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Learning</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("in-progress")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "in-progress"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "completed"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Completed
        </button>
      </div>
      <div>
        {courses
          .filter((course) => course.status === activeTab)
          .map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
      </div>
    </div>
  );
};

export default Learning;
