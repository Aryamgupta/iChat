import React, { useState, useEffect } from "react";
import { ChatState } from "./Context/ChatProvider";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { capatalise, getSender, getSenderComplete } from "../config/ChatLogic";
import ProfileModal from "./Missle/ProfileModal";
import UpadateGroupChatModal from "./Missle/UpadateGroupChatModal";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const ENDPOINT = "http://localhost:3000";

var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const toast = useToast();
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [socketConnection, setSocketConnection] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnection(true);
    });

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  // function to send messages

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      await sendMessagefinal();
    }
  };

  const sendMessagefinal = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };
      setNewMessage("");
      const { data } = await axios.post(
        "/api/message",
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );
      socket.emit("new message", data);
      setMessages([...messages, data]);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to send the Message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // funtions to fetch the all messages of chat

  const fetchChats = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      // console.log(messages);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // for socket connection functionality

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
          // console.log(notification);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  useEffect(() => {
    fetchChats();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // typing logic

    if (!socketConnection) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    // for auto typing stoppage
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "24px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{
                base: "flex",
                md: "none",
              }}
              icon={<ArrowBackIcon />}
              onClick={() => {
                setSelectedChat("");
              }}
              style={{
                color: "#FFF",
                borderRadius: "100%",
                background:
                  "radial-gradient(56.57% 56.57% at 32.61% 26.4%, #FFE9C8 0%, #3D3939 0.01%, #161616 100%)",
              }}
            ></IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  className="notificationPannel"
                  fontSize="20px"
                >
                  <Avatar
                    mr={1}
                    marginRight="10px"
                    size="sm"
                    cursor="pointer"
                    name={
                      !selectedChat.isGroupChat
                        ? getSender(user, selectedChat.users)
                        : selectedChat.chatName
                    }
                    src={
                      !selectedChat.isGroupChat
                        ? getSenderComplete(user, selectedChat.users).pic
                        : "to beupdated"
                    }
                  ></Avatar>
                  {capatalise(getSender(user, selectedChat.users))}
                </Box>
                <ProfileModal
                  user={getSenderComplete(user, selectedChat.users)}
                />
              </>
            ) : (
              <>
                <Box className="notificationPannel" fontSize="20px">
                  {capatalise(selectedChat.chatName)}
                </Box>
                <UpadateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchChats={fetchChats}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            backgroundColor="rgba(0, 0, 0, 0.3)"
            w="100%"
            h="100%"
            borderRadius="8px"
            overflowY="hidden"
            marginBottom="10px"
          >
            {loading ? (
              <Spinner
                size="lg"
                width={{ base: "40px", md: "70px" }}
                height={{ base: "40px", md: "70px" }}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} isTyping={isTyping} />
              </div>
            )}
            <FormControl
              display="flex"
              flexDir="row"
              onKeyDown={sendMessage}
              isRequired
              mt={3}
              style={{ background: "rgba(0,0,0,0.7)", borderRadius: "8px" }}
            >
              <Input
                pl="10px"
                style={{
                  border: "0px",
                  borderRadius: "0px",
                  fontWeight: "200",
                }}
                _active={{ color: "white" }}
                _focus={{ color: "white" }}
                variant="unstyled"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={(e) => typingHandler(e)}
                className="notificationPannel"
              />

              <IconButton
                style={{
                  color: "#FFF",
                  borderRadius: "8px",
                  background:
                    "radial-gradient(56.57% 56.57% at 32.61% 26.4%, #FFE9C8 0%, #3D3939 0.01%, #161616 100%)",
                }}
                icon={<ArrowForwardIcon />}
                onClick={sendMessagefinal}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text fontSize="3xl" pb={3} className="notificationPannel">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
