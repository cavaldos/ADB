import React, { useState } from "react";
import { MdClose, MdOpenInFull } from "react-icons/md";


const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <h1 className="text-lg font-bold">Chat App</h1>
      </div>
      <div className="w-8 h-8 bg-white rounded-full"></div>
    </div>
  );
};

const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-4 flex ${
            message.sender === "me" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-4 rounded-lg ${
              message.sender === "me"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 bg-white">
      <input
        type="text"
        className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="p-2 bg-blue-600 text-white rounded-r-lg">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 12l19-9-9 19-2-8-8-2z" />
        </svg>
      </button>
    </form>
  );
};
const FloatingComponent = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div
        className={`fixed bottom-0 right-0 w-[600px] h-[600px] bg-gray-300 text-white p-4 m-2 rounded-md shadow-lg z-50 transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div className="flex justify-between items-center">
          <span>Always on Top Component</span>
          <button onClick={toggleVisibility} className="text-white">
            <MdClose size={24} className="text-black" />
          </button>
        </div>

        <div className="mt-4">
          <button className="bg-white text-blue-500 px-4 py-2 rounded-lg text-black">
            Action
          </button>
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
const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how's your day going?", sender: "me" },
    {
      id: 2,
      text: "Not toosa asdfkj a fh dsaghhasdhgkasdf  khagf asdkjgfha khsdf kashg aksjdfh  bad, jusadfst a bit busy. How abouas dfasdf sdfaadfg   dsfads  asdfasd asdf t you?",
      sender: "other",
    },
    {
      id: 3,
      text: "I'm good, thanks. Anything exciting happening?",
      sender: "me",
    },
    {
      id: 4,
      text: "Not really, just the usual. Work and errands.",
      sender: "other",
    },
    {
      id: 5,
      text: "Sounds like a typical day. Got any plans for the weekend?",
      sender: "me",
    },
    {
      id: 6,
      text: "Not yet, I'm hoping to relax and maybe catch up on some reading. How about you?",
      sender: "other",
    },
    {
      id: 7,
      text: "I might go hiking if the weather's nice. Otherwise, just taking it easy",
      sender: "me",
    },
  ]);

  const handleSendMessage = (message) => {
    setMessages([
      ...messages,
      { id: messages.length + 1, text: message, sender: "me" },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-[500px]">
      <FloatingComponent />
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatApp;
