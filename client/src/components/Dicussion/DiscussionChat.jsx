import React, { useState, useEffect, useRef } from "react";
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

  const containerRef = useRef(null);

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

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;

      // Kiểm tra nếu đã cuộn đến cuối
      if (scrollTop + clientHeight >= scrollHeight) {
        // Ngăn cuộn thêm
        container.style.overflowY = "hidden";
      } else {
        // Cho phép cuộn nếu chưa đến cuối
        container.style.overflowY = "auto";
      }
    }
  };

  return (
    <>
      <div
        className="w-full flex flex-col rounded-md  relative h-[100%] overflow-hidden"
        onScroll={handleScroll}
        ref={containerRef}
      >
        <div
          className="bg-white p-1 rounded-md h-[80px]  opacity-65 bg-opacity-95
        flex items-center shadow-xl  shadow-blur backdrop-blur-2xl overflow-hidden"
        >
          dsf
        </div>
        <div className="flex-1 overflow-y-auto rounded-t-lg p-2 relative h-full pb-24 ">
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
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />
          <MessageForum message={message} />

          <AnymousMessage />
        </div>
        <div className="bg-white flex border rounded-3xl absolute bottom-4 right-4 left-4  min-w-auto shadow-2xl ">
          <input
            type="text"
            className="rounded-3xl w-full py-2 px-3 text-gray-700 focus:outline-none  
            overflow-hidden break-words bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200  "
            placeholder="Type a message"
          />

          <button className="ml-2 p-2 bg-blue-500 rounded-lg">
            <IoSend className="hover:text-gray-950 text-gray-800" size={24} />
          </button>
        </div>
      </div>
    </>
  );
}

export default DiscussionChat;
