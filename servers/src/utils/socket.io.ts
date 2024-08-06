import { Server } from "socket.io";
import portfinder from "portfinder";
import dotenv from "dotenv";
dotenv.config();
import { fetchPublicIP } from "../config/IP";
interface Message {
  content: string;
  senderId: string;
  receiverId: string;
}
const startSocketServer = async (port: number) => {
  try {
    const freePort = await portfinder.getPortPromise({ port });
    const io = new Server(freePort, {
      cors: {
        origin: "*",
      },
    });

    const users = new Map<string, string>(); // Map from userId to socketId

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

      socket.on("typing", (data: { senderId: string; receiverId: string }) => {
        const { senderId, receiverId } = data;
        const receiverSocketId = users.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("typing", { senderId });
        }
      });

      socket.on(
        "stopTyping",
        (data: { senderId: string; receiverId: string }) => {
          const { senderId, receiverId } = data;
          const receiverSocketId = users.get(receiverId);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit("stopTyping", { senderId });
          }
        }
      );

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        // Remove user from map when socket disconnects
        for (const [userId, socketId] of users.entries()) {
          if (socketId === socket.id) {
            users.delete(userId);
            break;
          }
        }
      });
    });
    const publicIP = await fetchPublicIP();

    console.log(`  💬  ➜ Socket.io  http://${publicIP}:${freePort} \n`);

    // Function to check connections and log
    const checkConnections = () => {
      // Here you can check active connections or any other condition
    };

    // Set interval to check connections
    setInterval(checkConnections, 10000); // Check every 10 seconds
  } catch (err) {
    console.error("Error finding free port:", err);
  }
};

export default startSocketServer;
