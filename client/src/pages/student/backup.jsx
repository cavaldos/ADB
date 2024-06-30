import React, { useState } from "react";

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
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatApp;
