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

const Login = () => {
  const history = useHistory("/");
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, loadUserDetails } = ChatState();

  const handleROnClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
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

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "User Loged In Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      setLoading(false);
      loadUserDetails();
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        // description: error.response.message.data,
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
      <FormControl id="email" isRequired>
        <FormLabel className="entries_labes">Email</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={{}}
          className="entries_input inputs "
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
            bg="#FFDCC8"
            color="#FF9500"
            style={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "normal",
              letterSpacing: "0.78px",
              borderRadius: "14px",
            }}
            className="entries_input"
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
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
