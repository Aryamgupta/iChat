import { Toast, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const toast = useToast();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [loggedUser, setLoggedUser] = useState();

  const { onClose } = useDisclosure();

  const [chatLoading, setChatLoading] = useState(false);

  //   if user is there direct to chats page
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo);
    setUser(userInfo);

    if (userInfo === null) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const accessChat = async (userId) => {
    try {
      setChatLoading(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          token: user.token,
        },
      };

      const { data } = await axios.post("/api/chat/", { userId }, config);

      if (chats && !chats.find((c) => c._id === data._id))
        setChats([data, ...chats]);

      setSelectedChat(data);
      setChatLoading(false);
      // console.log(data);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const loadUserDetails = () => {
    // console.log("it worked");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    // console.log(userInfo);
    if (userInfo === null) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const [postPage, setPostPage] = useState(true);

  const [isPostShow, setIsPostShow] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
        loadUserDetails,
        loggedUser,
        setLoggedUser,
        postPage,
        setPostPage,
        isPostShow,
        accessChat,
        chatLoading,
        setChatLoading,
        setIsPostShow,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
