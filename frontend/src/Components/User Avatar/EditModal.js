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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

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
        <ModalContent>
          <ModalHeader>Upadate Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder={user.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size=" sm" onClick={handleROnClick}>
                    {show ? "hide" : "show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Upload Your Picture</FormLabel>
              <Input
                type="file"
                p={1.5}
                accept="image/*"
                placeholder="Confirm Password"
                onChange={(e) => {
                  postDetails(e.target.files[0]);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              width={"120px"}
              style={{ marginTop: 15 }}
              onClick={submitHandler}
              isLoading={loading}
              loadingText="Processing..."
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
