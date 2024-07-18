import React, { useState } from "react";
import axios from "axios";

const CreateLessonDocument = () => {
  const [lesson, setLesson] = useState({
    title: "",
    duration: "",
    complexityLevel: "Medium",
    courseID: "",
    topicID: "",
  });

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "{{host_course}}/instructor/create_lesson_document",
        lesson
      );
      console.log(response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("There was an error creating the lesson document!", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <header className="w-full max-w-4xl mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Create Lesson Document</h1>
        </div>
        <div className="border-t border-gray-200 mt-4"></div>
      </header>

      <main className="w-full max-w-4xl text-center">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={lesson.title}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (in minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={lesson.duration}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Complexity Level
              </label>
              <select
                name="complexityLevel"
                value={lesson.complexityLevel}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Beginner">Beginner</option>
                <option value="Medium">Medium</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course ID
              </label>
              <input
                type="number"
                name="courseID"
                value={lesson.courseID}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Topic ID
              </label>
              <input
                type="number"
                name="topicID"
                value={lesson.topicID}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Create Lesson Document
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateLessonDocument;
