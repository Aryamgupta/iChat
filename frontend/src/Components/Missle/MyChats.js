import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, useToast, Button, Stack, Text, Avatar } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender, getSenderComplete } from "../../config/ChatLogic";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
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
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      className={`${selectedChat ? "none" : "dflex"} res-dflex`}
      d={{ md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
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
          >
            <Box display={{ base: "none", md: "flex", lg: "flex" }}>
              New Group Chat
            </Box>
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#dfdfdf"
        w="100%"
        h="88%"
        borderRadius="lg"
        overflowY="scroll"
        // overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#8b7a65" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
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
                  ></Avatar>
                }
                <Box>
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
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
