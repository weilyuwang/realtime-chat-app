import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;
const ENDPOINT = "localhost:5000";

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    // location prop comes from react-router-dom
    // location.search: '?name=...&room=...'
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    // On Cleanup/ComponentUnmount:
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location]);

  return <div>Chat</div>;
};

export default Chat;
