import React, { useState } from "react";
import useChatSocket from "../../hooks/userChatSocket";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const { messages, sendMessage } = useChatSocket(senderId);

  const handleSendMessage = () => {
    sendMessage(message, receiverId);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl text-red-800 mb-4">
        Đây là trang chat dành cho khách hàng
      </h1>
      <div className="flex w-full max-w-md mb-4">
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
      </div>
      <div className="border w-full max-w-md p-4 mb-4">
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="mb-2">
              {msg.senderId}: {msg.content}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full max-w-md">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow border p-2"
          placeholder="Type your message here..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-black p-2 ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
