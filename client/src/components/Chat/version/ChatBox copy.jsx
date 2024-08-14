import React, { useState, useRef, useEffect } from "react";
import { MdClose, MdOpenInFull } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import useChatSocket from "../../../hooks/userChatSocket";
import Tooltip from "@mui/material/Tooltip";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Badge} from "@mui/material";
export const ChatIcon = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/chat")}
      className=" bottom-4 right-4 text-black p-2 rounded-full z-50"
    >
      <Badge
        badgeContent={1}
        invisible={false}
        color="error"
        sx={{ color: "black" }}
      >
        <IoChatbubbleEllipsesOutline size={24} />
      </Badge>
    </button>
  );
};

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="w-[60px] bg-gray-700 p-2 overflow-y-auto rounded-md">
      {users.map((user, index) => (
        <div
          key={user.id}
          className="cursor-pointer mb-2"
          onClick={() => onSelectUser(user)}
          title={user.name}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full mx-auto"
          />
        </div>
      ))}
    </div>
  );
};

const ChatBox = () => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [senderId, setSenderId] = useState(0);
  const [receiverId, setReceiverId] = useState(0);
  const [messagesBase, setMessagesBase] = useState([]);
  const [loading, setLoading] = useState(true);

  const { messages, typingUsers, sendMessage, handleTyping } =
    useChatSocket(senderId);

  const handleSendMessage = () => {
    sendMessage(newMessage, receiverId);
    setNewMessage("");
    console.log("Send message", messages);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const fetchMessages = () => {
    setLoading(true);
    axios
      .post("http://113.173.71.43:5001/public/get_all_chat", {
        sendChatID: senderId,
        receiveChatID: receiverId,
      })
      .then((res) => {
        setMessagesBase(res.data.data);
        setLoading(false);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
        setTimeout(fetchMessages, 10000); // Retry after 1 second
      });
  };
  useEffect(() => {
    if (senderId && receiverId) {
      fetchMessages();
    }
  }, [senderId, receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2 rounded-t-lg max-h-[455px]">
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
        {loading && (
          <div className="flex justify-left items-left ">
            <span className="loading loading-dots loading-md"></span>
          </div>
        )}
        {!loading &&
          messagesBase.map((message, index) => (
            <div
              key={index}
              className={`p-2 gap-1 ${
                message.SenderID == senderId ? "text-right" : "text-left"
              }`}
            >
              <Tooltip
                key={message.ChatID}
                title={`${message.SenderName} - ${new Date(
                  message.time
                ).toLocaleString()}`}
                arrow
                placement="right-start"
              >
                <div
                  className={`inline-block py-1 px-2 min-h-8 min-w-[40px] rounded-lg max-w-[80%] break-words ${
                    message.SenderID == senderId
                      ? "bg-gray-300 text-black text-left"
                      : "bg-gray-400 text-black text-left"
                  }`}
                >
                  {message.ChatContent}
                </div>
              </Tooltip>
            </div>
          ))}
        {Array.from(typingUsers).map((userId, index) => (
          <div key={index} className={`p-2 text-left`}>
            <div
              className={`inline-block  px-2 rounded-lg w-[50px]  break-words bg-gray-400 text-center `}
            >
              <span className="loading loading-dots loading-md mt-1"></span>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex p-1 bg-gray-500 rounded-lg">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg bg-white"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping(e, receiverId);
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2 p-2 bg-blue-500 rounded-lg"
          onClick={handleSendMessage}
        >
          <IoSend className="hover:text-gray-950 text-gray-800" size={24} />
        </button>
      </div>
      {/*       
      <div className="flex items-center p-2 bg-white rounded-full shadow-md">
      <input
        type="text"
        className="flex-1 p-3 border-none rounded-full focus:outline-none"
        placeholder="Ask me anything..."
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
          handleTyping(e, receiverId);
        }}
        onKeyDown={handleKeyDown}
      />
      <button
        className="ml-2 p-3 bg-gray-800 rounded-full flex items-center justify-center"
        onClick={handleSendMessage}
      >
        <IoSend className="text-white" size={24} />
      </button>
    </div>
      */}
    </div>
  );
};

const FloatingComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([
    // Sample messages
    { text: "Hello!", isOwn: false },
    { text: "Hi, how are you?", isOwn: true },
    { text: "I'm good, thank you!", isOwn: false },
    { text: "How can I help you today?", isOwn: false },
    { text: "I have a question about your product", isOwn: true },
    { text: "Sure, what do you want to know?", isOwn: false },
    { text: "Can I get a demo?", isOwn: true },
    { text: "Yes, we can schedule a demo for you", isOwn: false },
    { text: "Great, when can we do it?", isOwn: true },
    { text: "How about tomorrow at 10 AM?", isOwn: false },
    { text: "Sounds good, see you then!", isOwn: true },
  ]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const users = [
    { id: 1, name: "User 1", avatar: "https://via.placeholder.com/40" },
    { id: 2, name: "User 2", avatar: "https://via.placeholder.com/40" },
    { id: 3, name: "User 3", avatar: "https://via.placeholder.com/40" },
  ];

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, isOwn: true }]);
  };

  return (
    <>
      <div
        className={`fixed bottom-0  right-0 w-[700px] h-[600px] bg-gray-300  text-white p-2 m-2 rounded-md shadow-lg z-50 transition-all duration-300  ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
          zIndex: 214748647,
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <span>Always on Top Component</span>
          <button onClick={toggleVisibility} className="text-white">
            <MdClose size={24} className="text-black" />
          </button>
        </div>

        <div className="flex h-[calc(100%-2rem)] ">
          <UserList users={users} onSelectUser={setSelectedUser} />
          <div className="flex-1 bg-white text-black p-2 rounded-lg ml-2 flex flex-col">
            {selectedUser ? (
              <div className="flex-1 flex flex-col">
                <h2>{selectedUser.name}</h2>
                <ChatBox />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                Select a user to start a conversation
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={toggleVisibility}
        className=" bottom-4 right-4  text-black p-2 rounded-full z-50"
      >
        <IoChatbubbleEllipsesOutline size={24} />
      </button>
      {/* {!isVisible && (
        <button
          onClick={toggleVisibility}
          className=" bottom-4 right-4 bg-black text-white p-2 rounded-full shadow-lg z-50"
        >
          <MdOpenInFull size={24} />
        </button>
      )} */}
    </>
  );
};
export default FloatingComponent;
