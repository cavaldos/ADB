import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const AdminAccount = () => {
  return (
    <div>
      <h1>Admin Account</h1>
    </div>
  );
};

const InstructorAccount = () => {
  return (
    <div>
      <h1>Instructor Account</h1>
    </div>
  );
};

const ButtonItem = ({ name, path, handler }) => {
  const handleClick = () => {
    handler();
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
const studentItems = [
  {
    name: "Profile",
    path: "#",
    handler: navigator.clipboard.writeText("Profile"),
  },
  {
    name: "Logout",
    path: "#",
    handler: console.log("Profile"),
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
              <ButtonItem key={index} name={item.name} path={item.path}  />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { AdminAccount, InstructorAccount, StudentAccount };
