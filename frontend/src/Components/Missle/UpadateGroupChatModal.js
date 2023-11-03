import { SettingsIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  useToast,
  Center,
  Box,
  FormControl,
  Input,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SelectedUserBadge from "../User Avatar/SelectedUserBadge";
import colorVar from "../ColorVaribales";
import axios from "axios";
import UserListItem from "../User Avatar/UserListItem";

const UpadateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchChats }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchChats();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleAddFunc = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };

      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }

    try {
      setRenameLoading(true);

      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    if (!query) {
      return;
    }
    setSearch(query);
    try {
      setLoading(true);
      const config = {
        headers: {
          token: user.token,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <IconButton
        d={{ base: "flex" }}
        icon={<SettingsIcon color="white" />}
        onClick={onOpen}
        style={{
          borderRadius: "100%",
          background:
            "radial-gradient(56.57% 56.57% at 32.61% 26.4%, #FFE9C8 0%, #3D3939 0.01%, #161616 100%)",
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          style={{
            borderRadius: "28px",
            background: "#FFE9C8",
            boxShadow:
              "3px 3px 10px 0px rgba(255, 207, 136, 0.80), -3px -3px 10px 0px rgba(255, 207, 136, 0.80)",
            backdropFilter: "blur(89px)",
            width: "300px",
          }}
        >
          <ModalHeader
            fontSize="20px"
            d="flex"
            textAlign="center"
            className="notificationPannel"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {selectedChat.users.map((u) => (
                <SelectedUserBadge
                  key={u._id}
                  user={u}
                  handleFunction={() => {
                    handleRemove(u);
                  }}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder={selectedChat.chatName}
                mb={3}
                value={groupChatName}
                onChange={(e) => {
                  setGroupChatName(e.target.value);
                }}
              />
              <Button
                style={{
                  borderRadius: "5px",
                  background:
                    "radial-gradient(56.57% 56.57% at 32.61% 26.4%, #FFE9C8 0%, #3D3939 0.01%, #161616 100%)",
                }}
                className="notificationPannel"
                fontSize="17px"
                color="white"
                fontWeight="200"
                ml={1}
                isLoading={renameLoading}
                // background={}
                onClick={handleRename}
              >
                <EditIcon />
              </Button>
            </FormControl>
            <FormControl display="flex">
              <Input
                placeholder="Add Users To Group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner
                style={{
                  display: "flex",
                  margin: " 4px auto",
                }}
                label="loading..."
                position="center"
                thickness="3px"
                speed="0.65s"
                emptyColor="gray.200"
                color={colorVar}
                size="lg"
              />
            ) : (
              searchResult?.slice(0, 4).map((user) => (
                <UserListItem
                  user={user}
                  key={user._id}
                  handleFunction={() => {
                    handleAddFunc(user);
                  }}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              style={{
                borderRadius: "5px",
                background:
                  "radial-gradient(56.57% 56.57% at 32.61% 26.4%, #FFE9C8 0%, #3D3939 0.01%, #161616 100%)",
              }}
              className="notificationPannel"
              fontSize="17px"
              color="white"
              fontWeight="200"
              onClick={() => {
                handleRemove(user);
              }}
            >
              <DeleteIcon />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpadateGroupChatModal;
