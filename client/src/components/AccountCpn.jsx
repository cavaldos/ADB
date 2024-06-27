import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
const ButtonItem = ({ name, path }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        {name}
      </button>
    </>
  );
};
const ButtonLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleClick = () => {
    dispatch(logout());
    navigate("/")
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="block px-4 py-2 text-red-700 hover:bg-gray-100 w-full text-left"
      >
        Logout
      </button>
    </>
  );
};

const AdminAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={toggleDropdown}
      >
        <a href="#" className="text-gray-600">
          English
        </a>
        <a href="#" className="text-gray-600">
          <AccountCircleIcon />
          {isOpen ? (
            <ArrowDropUpIcon className="ml-1" />
          ) : (
            <ArrowDropDownIcon className="ml-1" />
          )}
        </a>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
          <ul className="py-1">
            <ButtonItem />
            {studentItems.map((item, index) => (
              <ButtonItem key={index} name={item.name} path={item.path} />
            ))}
            <ButtonLogout />
          </ul>
        </div>
      )}
    </div>
  );
};

const InstructorAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={toggleDropdown}
      >
        <a href="#" className="text-gray-600">
          English
        </a>
        <a href="#" className="text-gray-600">
          <AccountCircleIcon />
          {isOpen ? (
            <ArrowDropUpIcon className="ml-1" />
          ) : (
            <ArrowDropDownIcon className="ml-1" />
          )}
        </a>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
          <ul className="py-1">
            <ButtonItem />
            {studentItems.map((item, index) => (
              <ButtonItem key={index} name={item.name} path={item.path} />
            ))}
            <ButtonLogout />
          </ul>
        </div>
      )}
    </div>
  );
};

const studentItems = [
  {
    name: "Profile",
    path: "/2",
  },
  {
    name: "Logddout",
    path: "/1",
  },
];
const StudentAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={toggleDropdown}
      >
        <a href="#" className="text-gray-600">
          English
        </a>
        <a href="#" className="text-gray-600">
          <AccountCircleIcon />
          {isOpen ? (
            <ArrowDropUpIcon className="ml-1" />
          ) : (
            <ArrowDropDownIcon className="ml-1" />
          )}
        </a>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
          <ul className="py-1">
            <ButtonItem />
            {studentItems.map((item, index) => (
              <ButtonItem key={index} name={item.name} path={item.path} />
            ))}
            <ButtonLogout />
          </ul>
        </div>
      )}
    </div>
  );
};

export { AdminAccount, InstructorAccount, StudentAccount };
