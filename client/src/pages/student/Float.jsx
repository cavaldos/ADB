

import React, { useState } from "react";
import { MdClose, MdOpenInFull } from "react-icons/md";
const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="w-[80px] bg-gray-700 p-2 overflow-y-auto">
      {users.map((user) => (
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

const ChatBox = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2 bg-gray-500 rounded-t-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 ${message.isOwn ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.isOwn
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-2 p-2 bg-gray-500 rounded-b-lg">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
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
  ]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const users = [
    { id: 1, name: "User 1", avatar: "https://via.placeholder.com/40" },
    { id: 2, name: "User 2", avatar: "https://via.placeholder.com/40" },
    { id: 3, name: "User 3", avatar: "https://via.placeholder.com/40" },
    // Add more users as needed
  ];

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, isOwn: true }]);
  };

  return (
    <>
      <div
        className={`fixed bottom-0 right-0 w-[700px] h-[600px] bg-gray-300 text-white p-2 m-2 rounded-md shadow-lg z-50 transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <span>Always on Top Component</span>
          <button onClick={toggleVisibility} className="text-white">
            <MdClose size={24} className="text-black" />
          </button>
        </div>

        <div className="flex h-[calc(100%-2rem)] bg-blue">
          <UserList users={users} onSelectUser={setSelectedUser} />
          <div className="flex-1 bg-white text-black p-2 rounded-lg ml-2 flex flex-col">
            {selectedUser ? (
              <div className="flex-1 flex flex-col">
                <h2>{selectedUser.name}</h2>
                <ChatBox
                  messages={messages}
                  onSendMessage={handleSendMessage}
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                Select a user to start a conversation
              </div>
            )}
          </div>
        </div>
      </div>
      {!isVisible && (
        <button
          onClick={toggleVisibility}
          className="fixed bottom-4 right-4 bg-black text-white p-2 rounded-full shadow-lg z-50"
        >
          <MdOpenInFull size={24} />
        </button>
      )}
    </>
  );
};
export default FloatingComponent;