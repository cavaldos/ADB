import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { Avatar } from "antd";

const UserChat = ({ open }) => {
  const khah = "khandh";
  const firstLetter = useCallback((name) => name.charAt(0).toUpperCase(), []);
  const [chosen, setChosen] = useState(true);
  return (
    <button
      className={`w-full text-left py-2 px-4  rounded 
         border-transparent flex justify-start items-center  btn  h-[65px] ${
           open ? "bg-gray-400" : ""
         }`}
    >
      <Avatar className="" size={"large"}>
        {firstLetter("khandh")}
      </Avatar>
      <div className="flex flex-col min-w-[120px] h-full p-1 rounded-sm">
        <span className="font-semibold  break-words text-black truncate max-w-full">
          {"usercNsdcasds f ame"}
        </span>
        <div className="flex items-center text-gray-600 mt-auto">
          <span className="truncate max-w-full overflow-hidden text-ellipsis">
            {"lastMessage"}
          </span>
          <span className="ml-2 text-xs">{"time"}</span>
        </div>
      </div>
    </button>
  );
};

function ChatUserList() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-80 bg-white shadow-md p-2 rounded-md">
      <div className="bg-gray-100 opacity-90 mb-10 h-[50px] flex items-center">
        <IoSearch className="text-3xl h-full mx-3 text-gray-600  w-7" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          className="border-none focus:outline-none w-full  h-full bg-transparent py-3 "
        />
        <div className="w-7 mr-3">
          {searchTerm && (
            <AiFillCloseCircle
              className="text-lg h-full  text-gray-600 hover:cursor-pointer"
              onClick={handleClearSearch}
            />
          )}
        </div>
      </div>
      <div className="overflow-y-hidden flex flex-col gap-1 ">
        <UserChat open={true} />
        <UserChat open={false} />
        <UserChat />
        <UserChat />
      </div>
    </div>
  );
}

export default ChatUserList;
