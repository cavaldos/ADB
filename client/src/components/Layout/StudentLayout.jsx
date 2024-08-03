import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StudentRouter } from "../../routes";
import { StudentAccount } from "../AccountCpn";
import ChatApp from "../Chat/ChatBox";
import SearchCourse from "../course/SearchCourse";
import Footer from "../other/Footer";

const Buttons = ({ name, path }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };
  const isActive = location.pathname === path;
  if (name === null || path === "") {
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
        <SearchCourse />
        <StudentAccount />
      </div>

      <div className=" shadow-md border-t ">
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
    <div className="h-screen flex flex-col ">
      <header className="bg-gray-200 fixed w-full h-[100px] z-50">
        <Navbar />
      </header>
      <main className="flex-1 mt-32 pb-[150px] ">
        {children}
        <ChatApp />
      </main>
      <Footer />
    </div>
  );
};

export default StudentLayout;
