const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("Hello World!");
  socket.on("join-room", (data) => {
    socket.join(data);
    console.log(`user with ID ${socket.id} joined room ${data}`);
  });
  socket.on("send_message", (data) => {
    console.log(data.message);
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log(`user id dicoonected ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
