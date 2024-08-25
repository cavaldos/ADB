import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://coursera.zapto.org:5002"); 

const useChatSocket = (senderId) => {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (senderId) {
      socket.emit("register", senderId); // Register senderId with the server
    }

    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("typing", ({ senderId }) => {
      setTypingUsers((prevUsers) => new Set(prevUsers).add(senderId));
    });

    socket.on("stopTyping", ({ senderId }) => {
      setTypingUsers((prevUsers) => {
        const newUsers = new Set(prevUsers);
        newUsers.delete(senderId);
        return newUsers;
      });
    });

    return () => {
      socket.off("message");
      socket.off("typing");
      socket.off("stopTyping");
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
      stopTyping(receiverId);
    }
  };

  const startTyping = (receiverId) => {
    if (senderId && receiverId) {
      socket.emit("typing", { senderId, receiverId });
    }
  };

  const stopTyping = (receiverId) => {
    if (senderId && receiverId) {
      socket.emit("stopTyping", { senderId, receiverId });
    }
  };

  const handleTyping = (e, receiverId) => {
    startTyping(receiverId);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping(receiverId);
    }, 1000);
  };

  return {
    messages,
    typingUsers,
    sendMessage,
    handleTyping,
  };
};

export default useChatSocket;
