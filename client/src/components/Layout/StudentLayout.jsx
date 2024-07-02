import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StudentRouter } from "../../routes";
import { StudentAccount } from "../AccountCpn";
import ChatApp from "../../pages/student/Float";
const Search = () => {
  return (
    <>
      <div className="flex items-center space-x-2 bg-test">
        <div className="relative">
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="border rounded-full px-4 py-2 w-80"
          />

          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 rounded-full p-2 text-black">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

const Buttons = ({ name, path }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };
  const isActive = location.pathname === path;
  if (name === null) {
    return <></>;
  }
  return (
    <button
      onClick={handleClick}
      className={`py-1 px-1 ease-in-out	 ${
        isActive
          ? "text-[#0156d1] border-b-2 border-[#0156d1] font-semibold "
          : "text-gray-600 font-medium hover:text-[#3e78c9]"
      }`}
    >
      {name}
    </button>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50 ">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center  ">
        <h1 className="text-4xl font-semibold text-[#0156d1] ">coursera</h1>
        <Search />
        <StudentAccount />
      </div>

      <div className="bg-white shadow-md border-t  ">
        <div className="container mx-auto px-6 py-2 flex space-x-6">
          {StudentRouter.map((item, index) => (
            <Buttons key={index} name={item.name} path={item.path} />
          ))}
        </div>
      </div>
    </nav>
  );
};
const StudentLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-gray-200 fixed w-full h-[100px]">
        <Navbar />
      </header>
      <main className="flex-1 mt-32 overflow-y-auto ">
        {children}
        <ChatApp />
      </main>
    </div>
  );
};

export default StudentLayout;
