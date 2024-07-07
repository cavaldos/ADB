import { Server } from "socket.io";

interface Message {
  content: string;
  senderId: string;
  receiverId: string;
}

const startSocketServer = (port: number) => {
  const io = new Server(port, {
    cors: {
      origin: "*",
    },
  });
  let hasConnection = false;

  const users = new Map<string, string>(); // Lưu trữ mapping từ userId đến socketId

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("register", (userId) => {
      users.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ID ${socket.id}`);
    });

    socket.on("message", (msg: Message) => {
      const { senderId, receiverId } = msg;
      console.log("Message received:", msg, senderId);
      try {
        const receiverSocketId = users.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("message", msg);
        }
      } catch (err) {
        console.error("Error sending message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      // Xóa user khỏi map khi socket ngắt kết nối
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(userId);
          break;
        }
      }
    });
  });

  console.log(`💬 Socket.io server running at http://localhost:${port}`);
  // Hàm kiểm tra kết nối và log
  const checkConnections = () => {
    if (hasConnection) {
      setTimeout(() => {
        console.log("waiting for connections to close...");
      }, 60000);
    }
  };

  // Thiết lập interval để kiểm tra kết nối
  setInterval(checkConnections, 100000); // Kiểm tra mỗi 10 giây
};

export default startSocketServer;


/*
import { Server } from "socket.io";

interface Message { 
    content: string;
    senderId: string;
    receiverId: string;
}
    
const startSocketServer = (port: number) => {
  const io = new Server(port, {
    cors: {
      origin: "*",
    },
  });

  let hasConnection = false;

  io.on("connection", (socket) => {
    hasConnection = true;
    console.log("New client connected:", socket.id);

    socket.on("message", (msg: Message) => {
      const { content, senderId, receiverId } = msg;
      console.log("Message received:", msg);
        //io.emit("message", msg); // Broadcast the message to all clients
        try {
   
          const receiverSocket = Array.from(io.sockets.sockets.values()).find(
            (s) => s.id === receiverId
          );
          if (receiverSocket) {
            receiverSocket.emit("message", msg);
          }
        } catch (err) {
          console.error("Error saving message to database:", err);
        }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      // Kiểm tra nếu không còn kết nối nào
      if (io.engine.clientsCount === 0) {
        hasConnection = false;
      }
    });
  });

  console.log(`💬 Socket.io server running at http://localhost:${port}`);

  // Hàm kiểm tra kết nối và log
  const checkConnections = () => {
    if (hasConnection) {
      setTimeout(() => {
        console.log("waiting for connections to close...");
      }, 60000);
    }
  };

  // Thiết lập interval để kiểm tra kết nối
  setInterval(checkConnections, 100000); // Kiểm tra mỗi 10 giây
};

export default startSocketServer;

*/