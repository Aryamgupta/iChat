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
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import { capatalise } from "../../config/ChatLogic";
import ProfilePost from "../Posts/ProfilePost";
import PostModal from "./PostModal";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, loggedUser, isPostShow, setIsPostShow, accessChat } =
    ChatState();

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
            border: "1.5px solid #000",
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
              onClick={async () => {
                await accessChat(user._id);
                onClose();
              }}
            />
            <Box margin="10px" width="150px">
              <p style={{ fontSize: "20px" }}>{capatalise(user.name)}</p>
              <p style={{ fontSize: "15px" }}>{user.email}</p>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            style={{
              width: "300px",
              height: "400px",
              // background: "red",
              padding: "0px",
              paddingBottom: "0px",
            }}
          >
            <Text
              className="postTime"
              fontSize="20px"
              color="white"
              fontWeight="300"
              style={{
                padding: " 20px",
                paddingBottom: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              onClick={() => {
                setIsPostShow(false);
              }}
              cursor="pointer"
            >
              <span>Activity</span>
              {user && loggedUser && user._id === loggedUser._id && (
                <Tooltip label="New Post" className="postTime">
                  <PostModal />
                </Tooltip>
              )}
            </Text>

            <ProfilePost userId={user._id} />
          </ModalBody>

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
