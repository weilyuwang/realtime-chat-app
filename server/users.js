const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id, name, room };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    // Removes the user from the users array
    return users.splice(userIndex, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

export { addUser, removeUser, getUser, getUsersInRoom };
