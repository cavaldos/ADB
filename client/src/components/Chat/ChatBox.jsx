import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { IoSend } from "react-icons/io5";
import { Avatar } from "antd";
import Tooltip from "@mui/material/Tooltip";
import useChatSocket from "../../hooks/userChatSocket";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const text =
  "mess age Ch at Cont esad fsd afd saf sf sdf sdaf sd f sdf sd f sdf sdf sd sdf  sdf s df sdf sd fds f sdf sd fs df sdf sd f sdf sd f sdf sd fds af sdaf sd f sdf sad f sdf sad f sadf sd f dsf sd f dssdf s df sd fs df sd f sdf sdf sd f sdaf sadf sadf asd fsad fnt";

const AnymousMessage = memo(() => {
  const firstLetter = useCallback((name) => name.charAt(0).toUpperCase(), []);
  return (
    <div className="flex flex-col rounded-md mb-1">
      <div className={`p-2 gap-1my-auto`}>
        <Tooltip title={`Anynomus`} arrow placement="top-start">
          <Avatar className="mr-2 mt-auto">{firstLetter("khandh")}</Avatar>
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
  const myId = 1;
  const firstLetter = useCallback((name) => name.charAt(0).toUpperCase(), []);
  const myMessage = message.userid === myId;
  const GuestMessage = useCallback(() => {
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
  }, [firstLetter, message.content]);

  const MyMessage = useCallback(() => {
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
  }, [firstLetter, message.content]);

  return (
    <div className="flex flex-col">
      {myMessage ? <MyMessage /> : <GuestMessage />}
    </div>
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

  const { messages, typingUsers, sendMessage, handleTyping } =
    useChatSocket(senderId);
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
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSendMessage();
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

  const fetchMessages = useCallback(() => {
    setLoading(true);
    axios
      .post("http://113.173.71.43:5001/public/get_all_chat", {
        sendChatID: senderId,
        receiveChatID: receiverId,
      })
      .then((res) => {
        setMessagesBase(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
        setTimeout(fetchMessages, 10000); // Retry after 10 seconds
      });
  }, [senderId, receiverId]);
  useEffect(() => {
    if (senderId && receiverId) {
      fetchMessages();
    }
  }, [senderId, receiverId]);

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
        >
          dsf
        </div>
        {/*  */}
        <div className="flex-1 overflow-y-auto rounded-t-lg p-2 relative h-full pb-24 ">
          {/*  */}
          <div className="flex w-full max-w-md mb-4">
            {/*  */}
            <input
              type="text"
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              className="flex-grow border p-2 mr-2"
              placeholder="Your ID"
            />
            <input
              type="text"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              className="flex-grow border p-2"
              placeholder="Receiver ID"
            />
            {/*  */}
          </div>
          {/*  */}
          {!loading &&
            message.map((discussion, index) => (
              <Message key={index} message={discussion} />
            ))}
          <Message message={message} />
          <Message message={message} />
          <Message message={message} />
          <Message message={message} />
          <Message message={message} />
          <Message message={message} />
          <Message message={message} />
          <Message message={message} />
          <Message message={message} />
          <Message message={message} />
          <Message message={message} />
          <Message message={message} />
          <Message message={message} />
          <Message message={message} />

          <AnymousMessage />
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
            onClick={handleSendMessage}
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
