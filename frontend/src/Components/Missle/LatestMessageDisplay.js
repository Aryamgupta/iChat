import { Box, Text } from "@chakra-ui/react";
import React from "react";
import UserAvatar from "../User Avatar/UserAvatar";
import { ChatState } from "../Context/ChatProvider";

function LatestMessageDisplay() {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  return <div></div>;
}

export default LatestMessageDisplay;
