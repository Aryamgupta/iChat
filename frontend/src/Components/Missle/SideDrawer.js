import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import UserListItem from "../User Avatar/UserListItem.js";
import {
  Drawer,
  Spinner,
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios, { Axios } from "axios";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";
import ProfileModal from "./ProfileModal";

import { useHistory } from "react-router-dom";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../config/ChatLogic";

import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import EditModal from "../User Avatar/EditModal";

const SideDrawer = () => {
  const toast = useToast();
  const History = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const logoutHandle = () => {
    localStorage.removeItem("userInfo");
    History.push("/");
  };

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
      console.log(data);
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

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          token: user.token,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setSearchResult(data);
      setLoading(false);
      console.log(searchResult);
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
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px "
        borderWidth="-5px"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text className="searchText" px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          iChat
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message From  ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                cursor="pointer"
                size="sm"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <EditModal user={user}>
                <MenuItem>Edit</MenuItem>
              </EditModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandle}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box
              d="flex"
              pb={2}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Input
                placeholder="Search by name or email"
                mr={2}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {chatLoading && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
