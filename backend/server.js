const express = require("express");
// package for environments
const dotenv = require("dotenv");
const chats = require("./data/data");
// for database connections
const mongoDbConnect = require("./config/db");
dotenv.config();
const path = require("path");

const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const postRoutes = require("./Routes/postRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

mongoDbConnect();
// instance of express
const app = express();

// to express the json data
app.use(express.json());
// base api endpoint

// app.get("/", (req, res) => {
//   console.log("App running");
//   res.send("Hello World");
// });

// endpoint for chat
app.use("/api/chat", chatRoutes);

// endpoint for the user login

app.use("/api/user", userRoutes);

// endpoint for meassages

app.use("/api/message", messageRoutes);

// endpoint for the post

app.use("/api/post", postRoutes);

// -------------------------- deplyment
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // deciding port

const server = app.listen(
  PORT,
  console.log("server listening on port on " + PORT)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("no users found");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
