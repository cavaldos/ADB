import React from "react";

const CreateLesson = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <header className="w-full max-w-4xl mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Step 1 of 4</h1>
          <a href="#" className="text-purple-500">
            Exit
          </a>
        </div>
        <div className="border-t border-gray-200 mt-4"></div>
      </header>

      <main className="w-full max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-6">
          First, let's find out what type of lesson you're making.
        </h2>
        <div className="flex justify-center space-x-4 mb-8">
          <div className="p-6 border border-gray-200 rounded-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-3.197-2.132a2 2 0 10-2.31 3.263l.255.162m0 0L9.197 13m.255-.162a2 2 0 112.31-3.263m-2.31 3.263l-.647.43M7 17h.01M12 5H3a2 2 0 00-2 2v12a2 2 0 002 2h9m10-10h-5a2 2 0 00-2 2v6a2 2 0 002 2h5a2 2 0 002-2v-6a2 2 0 00-2-2zM15 12h5"
                ></path>
              </svg>
              <h3 className="text-lg font-semibold mt-4">Lesson Test</h3>
              <p className="text-sm text-gray-600 mt-2">
                Create rich learning experiences with the help of video
                lectures, quizzes, coding exercises, etc.
              </p>
            </div>
          </div>
          <div className="p-6 border border-gray-200 rounded-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16.8 7.1c-.9-.6-1.5-.9-2.3-1.1a7.8 7.8 0 00-5.2 0c-.8.2-1.4.5-2.3 1.1-.9.6-1.4 1.4-1.8 2.3s-.4 1.8-.4 2.7v2c0 .9 0 1.8.4 2.7.4.9 1 1.7 1.8 2.3.9.6 1.5.9 2.3 1.1a7.8 7.8 0 005.2 0c.8-.2 1.4-.5 2.3-1.1.9-.6 1.4-1.4 1.8-2.3.4-.9.4-1.8.4-2.7v-2c0-.9 0-1.8-.4-2.7-.4-.9-1-1.7-1.8-2.3z"
                ></path>
              </svg>
              <h3 className="text-lg font-semibold mt-4">Lesson Document</h3>
              <p className="text-sm text-gray-600 mt-2">
                Help students prepare for certification exams by providing
                practice questions.
              </p>
            </div>
          </div>
          <div className="p-6 border border-gray-200 rounded-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16.8 7.1c-.9-.6-1.5-.9-2.3-1.1a7.8 7.8 0 00-5.2 0c-.8.2-1.4.5-2.3 1.1-.9.6-1.4 1.4-1.8 2.3s-.4 1.8-.4 2.7v2c0 .9 0 1.8.4 2.7.4.9 1 1.7 1.8 2.3.9.6 1.5.9 2.3 1.1a7.8 7.8 0 005.2 0c.8-.2 1.4-.5 2.3-1.1.9-.6 1.4-1.4 1.8-2.3.4-.9.4-1.8.4-2.7v-2c0-.9 0-1.8-.4-2.7-.4-.9-1-1.7-1.8-2.3z"
                ></path>
              </svg>
              <h3 className="text-lg font-semibold mt-4">Lesson Test</h3>
              <p className="text-sm text-gray-600 mt-2">
                Help students prepare for certification exams by providing
                practice questions.
              </p>
            </div>
          </div>
        </div>
        <button className="mt-4 py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-300">
          Continue
        </button>
      </main>
    </div>
  );
};

export default CreateLesson;
