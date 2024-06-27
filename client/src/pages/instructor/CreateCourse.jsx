import React, { useState } from "react";

const CourseForm = () => {
  const course = {
    title: "sf",
    subtitle: "sfd",
    description: "sdf",
    objective: "sdf",
    language: "dsf",
    image: "sdf",
    price: "sdf",
    type: "sdf",
    status: "sdf",
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Course Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={course.title}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subtitle
          </label>
          <input
            type="text"
            name="subtitle"
            value={course.subtitle}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={course.description}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Objective
          </label>
          <textarea
            name="objective"
            value={course.objective}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <input
            type="text"
            name="language"
            value={course.language}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={course.image}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={course.price}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <input
            type="text"
            name="type"
            value={course.type}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={course.status}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const LessonForm = () => {

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-bold mb-4">Lesson {1}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={"lesson.title"}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={"lesson.description"}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            name="duration"
            value={"lesson.duration"}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Objective
          </label>
          <textarea
            name="objective"
            value={"lesson.objective"}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Order
          </label>
          <input
            type="number"
            name="order"
            value={"lesson.order"}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Complexity Level
          </label>
          <input
            type="text"
            name="complexityLevel"
            value={"lesson.complexityLevel"}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <button
        type="button"
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Remove Lesson
      </button>
    </div>
  );
};

const CreateCourse = () => {
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState({
    title: "",
    subtitle: "",
    description: "",
    objective: "",
    language: "",
    image: "",
    price: "",
    type: "",
    status: "",
  });

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        title: "",
        description: "",
        duration: "",
        objective: "",
        order: "",
        complexityLevel: "",
      },
    ]);
  };

  const handleLessonChange = (index, e) => {
    const { name, value } = e.target;
    const newLessons = lessons.map((lesson, i) =>
      i === index ? { ...lesson, [name]: value } : lesson
    );
    setLessons(newLessons);
  };

  const removeLesson = (index) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ course, lessons });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CourseForm course={course} onChange={handleCourseChange} />
        <div>
          <h2 className="text-2xl font-bold mb-4">Lessons</h2>
          <LessonForm />
          <LessonForm />
          <button
            type="button"
            onClick={addLesson}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Lesson
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
