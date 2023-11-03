import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, useToast, Button, Stack, Text, Avatar } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender, getSenderComplete } from "../../config/ChatLogic";
import GroupChatModal from "./GroupChatModal";
import { updateData } from "moongose/controller/comments_controller";

const MyChats = ({ fetchAgain }) => {
  const {
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    loggedUser,
    setLoggedUser,
  } = ChatState();
  const toast = useToast();
  const [sender, setSender] = useState();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          token: user.token,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    console.log(loggedUser);
    fetchChats();
  }, [fetchAgain]);

  const timeCalc = (timeStr) => {
    let secs = Math.floor(timeStr / 1000);

    if (secs < 60) return `${secs} second${secs !== 1 ? "s" : ""} ago`;

    let mins = Math.floor(secs / 60);

    if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;

    let hrs = Math.floor(mins / 60);

    if (hrs < 24) return `${hrs} hour${hrs !== 1 ? "s" : ""} ago`;

    let days = Math.floor(hrs / 24);

    if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;

    let months = Math.floor(days / 30);

    if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

    let years = Math.floor(months / 12);

    return `${years} year${years !== 1 ? "s" : ""} ago`;
  };

  return (
    <Box
      className={`${
        selectedChat ? "none" : "dflex"
      } res-dflex notificationPannel`}
      d={{ md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      h="100%"
      w={{ base: "100%", md: "31%" }}
      height="100%"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "18px", md: "24px" }}
        className="notificationPannel"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            color="#636265"
            bg="transparent"
            _hover={{ backgroundColor: "rgba(99, 98, 101, 0.5)" }}
            _active={{ backgroundColor: "rgba(99, 98, 101, 0.8)" }}
          >
            <Box display={{ base: "none", md: "flex", lg: "flex" }}>
              Group Chat
            </Box>
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="white"
        w="100%"
        borderRadius="lg"
        overflowY="scroll"
        style={{
          height: "100%",
          borderRadius: "32px",
          background: "#FFE9C8",
          boxShadow:
            "4px 4px 8px 0px rgba(255, 198, 112, 0.60), -4px -4px 8px 0px rgba(255, 198, 112, 0.60)",
        }}
        // overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                className={`${
                  selectedChat === chat ? "selectedChatSTyle" : ""
                }`}
                _hover={
                  selectedChat !== chat
                    ? { backgroundColor: "rgba(99, 98, 101, 0.5)" }
                    : {}
                }
                px={3}
                py={2}
                borderRadius="15px"
                key={chat._id}
                style={{
                  display: "flex",
                  flexDir: "row",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                {
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={
                      !chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName
                    }
                    src={
                      !chat.isGroupChat
                        ? getSenderComplete(loggedUser, chat.users).pic
                        : "to beupdated"
                    }
                  ></Avatar>
                }
                <Box marginLeft="3px">
                  <Text
                    className="notificationPannel"
                    color={selectedChat === chat ? "#5E2E2E" : "#636265"}
                    fontSize="15px"
                  >
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  <Text fontSize="10px" style={{ opacity: "0.5" }}>
                    {timeCalc(new Date() - new Date(chat.updatedAt))}
                  </Text>
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
