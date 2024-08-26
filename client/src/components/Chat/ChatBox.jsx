import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { IoSend } from "react-icons/io5";
import { Avatar } from "antd";
import Tooltip from "@mui/material/Tooltip";
import useChatSocket from "../../hooks/userChatSocket";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PublicService from "../../services/Public.service";
import { ConvertTime } from "../../hooks/Time.utils";
const AnymousMessage = memo(() => {
  // const firstLetter = useCallback((name) => name.charAt(0).toUpperCase(), []);
  return (
    <div className="flex flex-col rounded-md mb-1">
      <div className={`p-2 gap-1my-auto`}>
        <Tooltip title={`Anynomus`} arrow placement="top-start">
          <Avatar className="mr-2 mt-auto">{"A"}</Avatar>
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
});
const Message = memo(({ message }) => {
  const { ChatID, SenderID, ChatContent, time, SenderName, ReceiverName } =
    message;
  const profile = useSelector((state) => state.profile);
  // const firstLetter = useCallback((name) => name.charAt(0).toUpperCase(), []);
  const myMessage = SenderID === profile.UserID;

  const GuestMessage = useCallback(() => {
    return (
      <div className="flex flex-col rounded-md mb-1">
        <div className={`p-2 gap-1my-auto`}>
          <Tooltip title={`${ReceiverName}`} arrow placement="top-start">
            <Avatar className="mr-2 mt-auto">{ReceiverName}</Avatar>
          </Tooltip>
          <Tooltip
            title={`${ConvertTime.convertDateToDDMMYYYY(time)}`}
            arrow
            placement="right-start"
          >
            <div
              className={`inline-block py-1 px-2 min-h-5 my-auto min-w-[40px] rounded-md  max-w-[70%] break-words text-left bg-gray-300 text-black `}
            >
              {ChatContent}
            </div>
          </Tooltip>
        </div>
      </div>
    );
  }, [ChatContent]);

  const MyMessage = useCallback(() => {
    return (
      <div className="flex flex-col rounded-md mb-1 ">
        <div className={`p-2 gap-1 flex justify-end my-auto`}>
          <Tooltip
            title={`${ConvertTime.convertDateToDDMMYYYY(time)}`}
            arrow
            placement="left-start"
          >
            <div
              className={`inline-block py-1 px-2 min-h-5 my-auto min-w-[40px] rounded-md  max-w-[70%] break-words text-left bg-gray-400 text-black `}
            >
              {ChatContent}
            </div>
          </Tooltip>
          <Tooltip title={`${profile.UserName}`} arrow placement="right-start">
            <Avatar className="mr-2 mt-auto">{"khandh"}</Avatar>
          </Tooltip>
        </div>
      </div>
    );
  }, [ChatContent]);

  return (
    <>
      <div className="flex flex-col">
        {myMessage ? <MyMessage /> : <GuestMessage />}
      </div>
    </>
  );
});
function ChatBox() {
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const [senderId, setSenderId] = useState(0);
  const [receiverId, setReceiverId] = useState(0);
  const [messagesBase, setMessagesBase] = useState([]);
  const myuserId = useSelector((state) => state.profile.UserID);
  const { chatID } = useParams();
  const [resetStateChat, setResetStateChat] = useState(false);
  const { messages, typingUsers, sendMessage, handleTyping } =
    useChatSocket(senderId);

  useEffect(() => {
    PublicService.Chat.getAllChat(myuserId, chatID).then((res) => {
      setMessagesBase(res.data);
    });
  }, [chatID, resetStateChat]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSendMessageAPI();
      }
    },
    [newMessage, receiverId]
  );
  const handleSendMessage = useCallback(() => {
    sendMessage(newMessage, receiverId);
    setNewMessage("");
  }, [newMessage, receiverId, sendMessage]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight) {
        container.style.overflowY = "hidden";
      } else {
        container.style.overflowY = "auto";
      }
    }
  }, []);

  const handleSendMessageAPI = async () => {
    await PublicService.Chat.createChat(newMessage, myuserId, chatID).then(
      (res) => {
        if (res.status === 200) {
          setNewMessage("");
          setResetStateChat(!resetStateChat);
        }
      }
    );
  };

  const messageEnd = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    messageEnd();
  }, [messages, newMessage]);

  return (
    <>
      <div
        className="w-full flex flex-col rounded-md  relative h-[100%] overflow-hidden"
        onScroll={handleScroll}
        ref={containerRef}
      >
        <div
          className="bg-white p-1 rounded-md h-[60px]  opacity-65 bg-opacity-95
        flex items-center shadow-xl  shadow-blur backdrop-blur-2xl overflow-hidden"
        ></div>
        {/*  */}
        <div className="flex-1 overflow-y-auto rounded-t-lg p-2 relative h-full pb-24 ">
          {!loading &&
            messagesBase?.map((item, index) => (
              <Message key={index} message={item} />
            ))}

          {/* <AnymousMessage /> */}
          {Array.from(typingUsers).map((userId, index) => (
            <AnymousMessage key={index} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="bg-white flex border rounded-3xl absolute bottom-4 right-4 left-4  min-w-auto shadow-2xl ">
          <input
            type="text"
            className="rounded-3xl w-full py-2 px-3 text-gray-700 focus:outline-none  
            overflow-hidden break-words bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200  "
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping(e, receiverId);
              messageEnd();
            }}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleSendMessageAPI}
            className="ml-2 p-2 bg-blue-500 rounded-lg"
          >
            <IoSend className="hover:text-gray-950 text-gray-800" size={24} />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
