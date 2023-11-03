import {
  Container,
  Box,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  // const history = useHistory();
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   if (userInfo) {
  //     history.push("/chats");
  //   }
  // }, [history]);
  // console.log("running");

  return (
    <Container maxW="lg" centerContent paddingBottom="100px">
      <Box d="flex" justifyContent="center" p={3} w="100%" m="40px 0 15px 0">
        <Text
          textAlign="center"
          fontSize="20px"
          style={{
            color: "#5D2E2E",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
          }}
        >
          Hello User
        </Text>
        <Text
          textAlign="center"
          style={{
            color: "#5D2E2E",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          Welcome to iChat
        </Text>
      </Box>
      <Box
        p={4}
        w="100%"
        bg="#FFE9C8"
        borderRadius="28px"
        borderWidth="1px"
        style={{
          boxShadow:
            "3px 3px 10px 0px rgba(255, 207, 136, 0.80), -3px -3px 10px 0px rgba(255, 207, 136, 0.80)",
          backdropFilter: "blur(89px)",
        }}
      >
        <Tabs variant="soft-rounded" colorScheme="rgba(255, 220, 200, 0.5)">
          <TabList mb="1rem">
            <Tab
              width="50%"
              style={{
                color: "#FF9500",
                textaAlign: "center",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "normal",
                letterSpacing: "1.3px",
              }}
            >
              Login
            </Tab>
            <Tab
              width="50%"
              style={{
                color: "#FF9500",
                textaAlign: "center",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "normal",
                letterSpacing: "1.3px",
              }}
            >
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
