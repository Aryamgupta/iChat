import React, { useState } from "react";
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
  useToast,
  FormControl,
  Input,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../User Avatar/UserListItem";
import SelectedUserBadge from "../User Avatar/SelectedUserBadge";
import colorVar from "../ColorVaribales";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //   states needed

  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { user, chats, setChats } = ChatState();

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

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          token: user.token,
        },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  //   funtion to add into the group

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  //   to remove the user

  const handleRemoveUser = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleonClose = () => {
    setSearch("");
    setGroupChatName("");
    setSearchResult([]);
    setSelectedUsers([]);
    onClose();
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={handleonClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            textAlign="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers?.map((user) => (
                <SelectedUserBadge
                  key={user._id}
                  user={user}
                  handleFunction={() => {
                    handleRemoveUser(user);
                  }}
                />
              ))}
            </Box>
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
                    handleGroup(user);
                  }}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
