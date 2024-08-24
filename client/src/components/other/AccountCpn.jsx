import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { logout } from "../../redux/features/profileSlice";
import Notify from "./Notify";
import ChatIcon from "../Chat/ChatIcon";
import { Menu, MenuItem } from "@mui/material";

const ButtonItem = ({ name, path }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <MenuItem
      onClick={handleClick}
      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left min-w-[120px]"
    >
      {name}
    </MenuItem>
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
    <MenuItem
      onClick={handleClick}
      className="block px-4 py-2 text-red-700 hover:bg-gray-100 w-full text-left"
    >
      <h1 className="text-ret">Logout</h1>
    </MenuItem>
  );
};

const AccountDropdown = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDropdown = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={toggleDropdown}
      >
        <a className="text-gray-600 select-none">English</a>
        <a className="text-gray-600">
          <AccountCircleIcon />
          {anchorEl ? (
            <ArrowDropUpIcon className="ml-1" />
          ) : (
            <ArrowDropDownIcon className="ml-1" />
          )}
        </a>
      </div>
      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "options-menu",
        }}
        className="py-1 text-gray-700 dark:text-gray-400 text-sm"
      >
        {children}
      </Menu>
    </div>
  );
};

const AdminAccount = () => {
  const studentItems = [
    { name: "Profile", path: "/profile" },
  ];

  return (
    <AccountDropdown>
      {studentItems.map((item, index) => (
        <ButtonItem key={index} name={item.name} path={item.path} />
      ))}
      <ButtonLogout />
    </AccountDropdown>
  );
};

const InstructorAccount = () => {
  const instructorItems = [
    { name: "Profile", path: "/profile" },
    { name: "Revenue", path: "/revenue" },
  ];

  return (
    <div className="flex items-center space-x-4 cursor-pointer z-50">
      <ChatIcon />
      <Notify />
      <AccountDropdown>
        {instructorItems.map((item, index) => (
          <ButtonItem key={index} name={item.name} path={item.path} />
        ))}
        <ButtonLogout />
      </AccountDropdown>
    </div>
  );
};

const StudentAccount = () => {
  const studentItems = [
    { name: "Profile", path: "/profile" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <div className="relative">
      <div className="flex items-center space-x-4 cursor-pointer">
        <ChatIcon />
        <Notify />
        <AccountDropdown>
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
