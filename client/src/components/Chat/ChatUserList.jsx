import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { Avatar, Tag, Tooltip } from "antd";
import PublicService from "../../services/Public.service";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const UserChat = ({ props }) => {
  const { UserID, UserName, FullName, Role, Email } = props;
  console.log(UserID, UserName, FullName, Role, Email);
  const firstLetter = useCallback((name) => name.charAt(0).toUpperCase(), []);
  const navigate = useNavigate();
  const { chatID } = useParams();
  const handleChooseUser = () => {
    navigate(`/chat/${UserID}`);
  };
  return (
    <button
      onClick={handleChooseUser}
      className={`w-full text-left py-2 px-4  rounded 
         border-transparent flex justify-start items-center  btn  h-[65px] ${
           chatID == UserID ? "bg-gray-400" : ""
         }`}
    >
      <Tooltip title={`UserID ${UserID}`} arrow placement="left-start">
        <Avatar className="" size={"large"}>
          {firstLetter(FullName)}
        </Avatar>
      </Tooltip>

      <div className="flex flex-col min-w-[120px] h-full p-1 rounded-sm">
        <span className="font-semibold  break-words text-black truncate max-w-full">
          {FullName}
        </span>
        <div className="flex items-center text-gray-600 mt-auto">
          <Tag>
            <span className="truncate max-w-full overflow-hidden text-ellipsis">
              {Role}
            </span>
          </Tag>
          {/* <span className="ml-2 text-xs">{"time"}</span> */}
        </div>
      </div>
    </button>
  );
};

function ChatUserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const profile = useSelector((state) => state.profile);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    PublicService.Chat.getAllUserChat(profile.UserID).then((res) => {
      setUsers(res.data);
    });
  }, []);

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
        {users?.map((user, index) => (
          <UserChat key={index} props={user} />
        ))}
      </div>
    </div>
  );
}

export default ChatUserList;
