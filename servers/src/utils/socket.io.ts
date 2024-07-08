import { Server } from "socket.io";
import portfinder from "portfinder";

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

    console.log(
      `\n 💬 Socket.io server running at http://localhost:${freePort}`
    );
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
  } catch (err) {
    console.error("Error finding free port:", err);
  }
};

export default startSocketServer;
