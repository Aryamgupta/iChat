import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  VStack,
  InputRightElement,
  Button,
  useToast,
  Toast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const SignUp = () => {
  const history = useHistory("/");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { setUser } = ChatState();

  const handleROnClick = () => {
    setShow(!show);
  };

  const postDetails = (pics) => {
    setLoading(true);
    // for cheecking if pic is presend or not
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
        title: "Please Select an Image...",
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
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
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
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      console.log(data);
      toast({
        title: "User Registered Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
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
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel className="entries_labes">Name</FormLabel>
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          style={{
            color: "#FF9500",
            fontFamily: "Poppins",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            letterSpacing: "0.78px",
            borderRadius: "14px",
            background: "#FFDCC8",
          }}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel className="entries_labes">Email</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={{
            color: "#FF9500",
            fontFamily: "Poppins",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            letterSpacing: "0.78px",
            borderRadius: "14px",
            background: "#FFDCC8",
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel className="entries_labes">Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{
              color: "#FF9500",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "normal",
              letterSpacing: "0.78px",
              borderRadius: "14px",
              background: "#FFDCC8",
            }}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size=" sm"
              onClick={handleROnClick}
              bg="transparent"
            >
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confrimPassword" isRequired>
        <FormLabel className="entries_labes">Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            style={{
              color: "#FF9500",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "normal",
              letterSpacing: "0.78px",
              borderRadius: "14px",
              background: "#FFDCC8",
            }}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size=" sm"
              onClick={handleROnClick}
              bg="transparent"
            >
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel className="entries_labes">Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          placeholder="Confirm Password"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
          style={{
            color: "#FF9500",
            fontFamily: "Poppins",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            letterSpacing: "0.78px",
            borderRadius: "14px",
            background: "#FFDCC8",
          }}
        />
      </FormControl>

      <Button
        style={{
          marginTop: 15,
          borderRadius: "14px",
          width: "50%",
          background: "#FFCCF4",
          boxShadow:
            "4px 4px 8px 0px rgba(0, 0, 0, 0.10) inset, -4px -4px 8px 0px rgba(0, 0, 0, 0.10) inset",

          color: "#5D2E2E",
          textAlign: "center",
          fontFamily: "Poppins",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "normal",
          letterSpacing: " 1.3px",
        }}
        onClick={submitHandler}
        isLoading={loading}
        loadingText="Processing..."
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
