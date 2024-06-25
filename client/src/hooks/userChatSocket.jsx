import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5006"); // Cập nhật port cho Socket.io

const useChatSocket = (senderId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (senderId) {
      socket.emit("register", senderId); // Đăng ký senderId với server
    }

    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [senderId]);

  const sendMessage = (message, receiverId) => {
    if (message.trim() && senderId && receiverId) {
      const data = {
        content: message,
        senderId,
        receiverId,
      };
      socket.emit("message", data);
    }
  };

  return {
    messages,
    sendMessage,
  };
};

export default useChatSocket;
