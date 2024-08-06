import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import Notify from "./Notify";

const ButtonItem = ({ name, path }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <button
      onClick={handleClick}
      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
    >
      {name}
    </button>
  );
};

const ButtonLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <button
      onClick={handleClick}
      className="block px-4 py-2 text-red-700 hover:bg-gray-100 w-full text-left"
    >
      Logout
    </button>
  );
};

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

const AccountDropdown = ({ children, isOpen, toggleDropdown }) => {
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => isOpen && toggleDropdown());

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={toggleDropdown}
      >
        <a className="text-gray-600 select-none">English</a>
        <a className="text-gray-600">
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
          <ul className="py-1">{children}</ul>
        </div>
      )}
    </div>
  );
};

const AdminAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccountDropdown isOpen={isOpen} toggleDropdown={toggleDropdown}>
      <ButtonItem />
      {studentItems.map((item, index) => (
        <ButtonItem key={index} name={item.name} path={item.path} />
      ))}
      <ButtonLogout />
    </AccountDropdown>
  );
};

const InstructorAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const instructorItem = [
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Revenue",
      path: "/revenue",
    },
  ];
  return (
    <AccountDropdown isOpen={isOpen} toggleDropdown={toggleDropdown}>
      <ButtonItem />
      {instructorItem.map((item, index) => (
        <ButtonItem key={index} name={item.name} path={item.path} />
      ))}
      <ButtonLogout />
    </AccountDropdown>
  );
};

const studentItems = [
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Cart",
    path: "/cart",
  },
];

const StudentAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-4 cursor-pointer">
        <Notify />
        <AccountDropdown isOpen={isOpen} toggleDropdown={toggleDropdown}>
          <ButtonItem />
          {studentItems.map((item, index) => (
            <ButtonItem key={index} name={item.name} path={item.path} />
          ))}
          <ButtonLogout />
        </AccountDropdown>
      </div>
    </div>
  );
};

export { AdminAccount, InstructorAccount, StudentAccount };
