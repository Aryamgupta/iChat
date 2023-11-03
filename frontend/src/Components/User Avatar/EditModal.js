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
  FormControl,
  Input,
  FormLabel,
  useToast,
  InputGroup,
  InputRightElement,
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";

const EditModal = ({ children }) => {
  const [show, setShow] = useState(false);
  const history = useHistory("/");

  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = ChatState();

  const handleROnClick = () => {
    setShow(!show);
  };

  const postDetails = (pics) => {
    setLoading(true);
    // for cheecking if pic is presend or not
    if (pics == undefined) {
      return;
    }
    if (
      pics !== undefined ||
      pics.type === "image/jpeg" ||
      pics.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "iChat-App");
      data.append("cloud_name", "dy4gud84y");
      axios
        .post("https://api.cloudinary.com/v1_1/dy4gud84y/image/upload", data)
        .then((response) => {
          setPic(response.data.url.toString());
          setLoading(false);
          toast({
            title: "Image uploaded successfully!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        })
        .catch((error) => {
          console.log("Cloudinary error:", error);
          setLoading(false);
        });
    }
    // handles error if pic is not present or not of defined type
    else {
      toast({
        title: "Please Select Diff Image...",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name && !email && !password) {
      toast({
        title: "Nothing To Edit",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };

      const { data } = await axios.put(
        "/api/user/update",
        {
          name,
          newPassword: password,
          pic,
        },
        config
      );

      setUser(data);

      toast({
        title: "Details Updated Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen}>
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
          className="notificationPannel"
        >
          <ModalHeader>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                className="notificationPannel"
                fontSize="20px"
                fontWeight="400"
              >
                Upadate Details
              </Text>
              <Button
                onClick={onClose}
                style={{
                  color: "#FFF",
                  borderRadius: "100%",
                  background:
                    "radial-gradient(56.57% 56.57% at 32.61% 26.4%, #FFE9C8 0%, #3D3939 0.01%, #161616 100%)",
                }}
              >
                <CloseIcon />
              </Button>
            </Box>
          </ModalHeader>
          <ModalBody>
            <FormControl marginBottom="10px">
              <FormLabel className="entries_labes">Name</FormLabel>
              <Input
                type="text"
                placeholder={user.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="entries_input inputs "
              />
            </FormControl>
            <FormControl marginBottom="10px">
              <FormLabel className="entries_labes">Password</FormLabel>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="entries_input inputs "
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size=" sm"
                    onClick={handleROnClick}
                    bg="transparent"
                    _hover={{ backgroundColor: "transparent" }}
                  >
                    {show ? "hide" : "show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl marginBottom="10px">
              <FormLabel className="entries_labes">
                Upload Your Picture
              </FormLabel>
              <Input
                type="file"
                p={1.5}
                accept="image/*"
                placeholder="Confirm Password"
                onChange={(e) => {
                  postDetails(e.target.files[0]);
                }}
                className="entries_input inputs "
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              style={{
                marginTop: 15,
                borderRadius: "20px",
                background:
                  " radial-gradient(56.57% 56.57% at 32.61% 26.4%, #FFE9C8 0%, #3D3939 0.01%, #161616 100%)",

                fontSize: "20px",
                color: "white",
                padding: "10px",
              }}
              onClick={submitHandler}
              isLoading={loading}
              loadingText="Processing..."
            >
              <EditIcon />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
