import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [loggedUser, setLoggedUser] = useState();

  //   if user is there direct to chats page
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
    setUser(userInfo);

    if (userInfo === null) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const loadUserDetails = () => {
    console.log("it worked");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    console.log(userInfo);
    if (userInfo === null) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

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
