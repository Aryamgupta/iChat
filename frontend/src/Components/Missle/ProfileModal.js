import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import { capatalise } from "../../config/ChatLogic";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, loggedUser } = ChatState();

  const setFriendsDate = (datee) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      "   " +
      datee.getDate() +
      " " +
      monthNames[datee.getMonth() - 1] +
      " " +
      datee.getFullYear()
    );
  };
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<ViewIcon color="white" />}
          onClick={onOpen}
          style={{
            borderRadius: "100%",
            background:
              "radial-gradient(56.57% 56.57% at 32.61% 26.4%, #FFE9C8 0%, #3D3939 0.01%, #161616 100%)",
          }}
        />
      )}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxWidth="300px"
          style={{
            borderRadius: "10px",
            border: " 1.5px solid #000",
            background:
              "radial-gradient(56.57% 56.57% at 32.61% 26.4%, #FFE9C8 0%, #3D3939 0.01%, #161616 100%)",
            color: "white",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: " 20.056px",
            /* 167.132% */
            letterSpacing: "-0.372px",
          }}
        >
          <ModalHeader
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "",
              // alignItems: "center",
            }}
          >
            <Image
              borderRadius="10px"
              boxSize="100px"
              src={user.pic}
              alt={user.name}
            />
            <Box margin="10px" width="150px">
              <p style={{ fontSize: "20px" }}>{capatalise(user.name)}</p>
              <p style={{ fontSize: "15px" }}>{user.email}</p>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></ModalBody>

          <ModalFooter>
            {user && loggedUser && user._id != loggedUser._id && (
              <Text
                textAlign="right"
                fontSize="10px"
                style={{ opacity: "0.5" }}
              >
                Friends Since
                {selectedChat &&
                  setFriendsDate(new Date(selectedChat.createdAt))}
              </Text>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
