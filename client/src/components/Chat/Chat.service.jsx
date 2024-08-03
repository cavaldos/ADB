import React from "react";

function ChatService() {
  const [message, setMessage] = useState("");
  return {
    message,
    setMessage,
  };
}

export default ChatService;
