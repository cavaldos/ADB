import React, { useState } from "react";
import DiscusiionService from "./DiscusiionService";
import { IoSend } from "react-icons/io5";
import { Avatar, Space } from "antd";
import Tooltip from "@mui/material/Tooltip";
import { UserOutlined } from "@ant-design/icons";

const text =
  "message.ChatContesadfsdafdsaf sf sdf sdaf sd f sdf sd f sdf sdf sd sdf  sdf s df sdf sd fds f sdf sd fs df sdf sd f sdf sd f sdf sd fds af sdaf sd f sdf sad f sdf sad f sadf sd f dsf sd f dssdf s df sd fs df sd f sdf sdf sd f sdaf sadf sadf asd fsad fnt";

const AnymousMessage = () => {
  return (
    <div className="flex flex-col rounded-md mb-1">
      <div className={`p-2 gap-1my-auto`}>
        <Tooltip title={`Anynomus`} arrow placement="top-start">
          <Avatar className="mr-2 mt-auto" icon={<UserOutlined />} />
        </Tooltip>
        <Tooltip title={`inputing`} arrow placement="right-start">
          <div
            className={`inline-block py-1 px-2 min-h-5 my-auto min-w-[40px] rounded-md  max-w-[70%] break-words text-left bg-gray-400 text-black `}
          >
            <span className="loading loading-dots loading-md "></span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

const MessageForum = ({ message }) => {
  const myId = 1; // lay my tu redux
  const firstLetter = (name) => name.charAt(0).toUpperCase();
  const myMessage = message.userid === myId;
  const GuestMessage = () => {
    return (
      <div className="flex flex-col rounded-md mb-1">
        <div className={`p-2 gap-1my-auto`}>
          <Tooltip title={`${"ddd"} - ${"ddd"}`} arrow placement="top-start">
            <Avatar className="mr-2 mt-auto">{firstLetter("khandh")}</Avatar>
          </Tooltip>
          <Tooltip title={`${"ddd"} - ${"ddd"}`} arrow placement="right-start">
            <div
              className={`inline-block py-1 px-2 min-h-5 my-auto min-w-[40px] rounded-md  max-w-[70%] break-words text-left bg-gray-300 text-black `}
            >
              {text}
            </div>
          </Tooltip>
        </div>
      </div>
    );
  };
  const MyMessage = () => {
    return (
      <div className="flex flex-col rounded-md mb-1 ">
        <div className={`p-2 gap-1 flex justify-end my-auto`}>
          <Tooltip title={`${"ddd"} - ${"ddd"}`} arrow placement="left-start">
            <div
              className={`inline-block py-1 px-2 min-h-5 my-auto min-w-[40px] rounded-md  max-w-[70%] break-words text-left bg-gray-400 text-black `}
            >
              {text}
            </div>
          </Tooltip>
          <Tooltip title={`${"ddd"} - ${"ddd"}`} arrow placement="top-start">
            <Avatar className="mr-2 mt-auto">{firstLetter("khandh")}</Avatar>
          </Tooltip>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {myMessage ? <MyMessage /> : <GuestMessage />}
    </div>
  );
};

function DiscussionChat() {
  const { discussionID, discussions, setDiscussions } = DiscusiionService();
  const [loading, setLoading] = useState(false);
  const myId = 1;
  const message = [
    {
      userid: 1,
      username: "user1",
      content: "Hello",
      createdAt: "2021-09-20",
    },
    {
      userid: 2,
      username: "user2",
      content: "Hi",
      createdAt: "2021-09-20",
    },
  ];
  return (
    <div className="w-full flex flex-col rounded-md">
      <div className="bg-red-100 p-1 rounded-md">dsf</div>
      <div className="flex-1 overflow-y-auto p-2 rounded-t-lg  ">
        {loading && (
          <div className="flex justify-left items-left">
            <span className="loading loading-dots loading-md"></span>
          </div>
        )}
        {!loading &&
          message.map((discussion, index) => (
            <MessageForum key={index} message={discussion} />
          ))}
        <MessageForum message={message} />
        <AnymousMessage />
      </div>
      <div className="flex p-1 bg-gray-500 rounded-lg sticky">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg bg-white"
          placeholder="Type a message"
          value={"newMessage"}
          // onChange={(e) => {
          //   setNewMessage(e.target.value);
          //   handleTyping(e, receiverId);
          // }}
          // onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2 p-2 bg-blue-500 rounded-lg"
          // onClick={handleSendMessage}
        >
          <IoSend className="hover:text-gray-950 text-gray-800" size={24} />
        </button>
      </div>
    </div>
  );
}

export default DiscussionChat;
