import express from "express";
import socketio from "socket.io";
import http from "http";
import router from "./router.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(router);

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("We have a new connection");

  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);
  });

  socket.on("disconnect", () => {
    console.log("User had left");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
