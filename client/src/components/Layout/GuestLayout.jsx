import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Footer from "../Footer";
import { GuestRouter } from "../../routes";

const ButtonItem = ({ name, path }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };
  const isActive = location.pathname === path;
   if (name === null) {
     return <div></div>;
   }
  return (
    <button
      onClick={handleClick}
      className={`py-1 px-1 ease-in-out	text-gray-700 hover:text-blue-600 ${
        isActive
          ? "text-[#0156d1] border-b-2 border-[#0156d1]"
          : "text-gray-600  hover:text-[#3e78c9]"
      }`}
    >
      {name}
    </button>
  );
};

const GuestLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1
              onClick={() => navigate("/")}
              className="text-4xl font-semibold text-[#0156d1] cursor-pointer "
            >
              coursera
            </h1>
            <ul className="flex space-x-4 ml-10">
              <ButtonItem name="For Business" path="/" />
              <ButtonItem name="For Campus" path="/2" />
              <ButtonItem name="Teach on Coursera" path="/3" />
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={() => navigate("/signin")}
              className="text-gray-700 hover:text-sky-600 font-semibold"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="hover:text-sky-700 border hover:border-sky-700 rounded-full px-4 py-2 font-semibold"
            >
              Join for Free
            </button>
          </div>
        </nav>
      </header>
      <main className="flex-grow min-h-[90vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default GuestLayout;
