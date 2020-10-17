import express from "express";
import socketio from "socket.io";
import http from "http";
import router from "./router.js";
import { addUser, removeUser, getUser, getUsersInRoom } from "./users.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(router);

const server = http.createServer(app);
const io = socketio(server);

// socket is the connected client socket
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    // Send message to the user just joined
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    // Broadcasat message to all the users in the room except the user
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined`,
    });

    socket.join(user.room);

    callback();
  });

  // Receive sendMessage event from client/frontend
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User had left");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
