import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js'; 
import userRouter from './routes/userRoutes.js';           
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';

//create express apss and http server
const app = express();
const server = http.createServer(app);

//initialize socket.io server
// export const io = new Server(server, {
//     cors: {origin: "*"} 
// })

export const io = new Server(server, {
    cors: {
        origin: ["https://chat-app-neon-ten-95.vercel.app/"], // 🔹 your frontend Vercel URL here
        methods: ["GET", "POST"],
        credentials: true
    }
});


//store online users
export const userSocketMap = {}; //userId: socketId

// //socket.io connection handler
// io.on("connection", (socket)=>{
//     const userId = socket.handshake.query.userId;
//     console.log("User Connected", userId);

//     if(userId) userSocketMap[userId] = socket.id;

//     //emit online users to all connected clients
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));

//     socket.on("disconnect", ()=>{
//         console.log("User Disconnected", userId);
//         delete userSocketMap[userId];
//         io.emit("getOnlineUsers", Object.keys(userSocketMap))
//     })
// })

//socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("🟢 User Connected:", userId, "Socket:", socket.id);

  if (userId) {
    userSocketMap[userId] = socket.id;
    // Broadcast updated online users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("disconnect", (reason) => {
    console.log("🔴 User Disconnected:", userId, "Reason:", reason);
    if (userId && userSocketMap[userId] === socket.id) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });

  // Optional: explicit logout from frontend
  socket.on("manualLogout", () => {
    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
      console.log("👋 Manual logout from:", userId);
    }
  });
});





//middleware setup
app.use(express.json({limit: "4mb"}));
// app.use(cors()); 
app.use(cors({
    origin: ["https://chat-app-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

//Routes setup
app.use("/api/status", (req, res) => res.send("Server is running"));
app.use("/api/auth", userRouter); 
app.use("/api/messages", messageRouter)


//connect to database MongoDB
 await connectDB();

if(process.env.NODE_ENV !== "production"){
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
}

//export server for vercel
export default server;