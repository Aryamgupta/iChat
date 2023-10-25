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
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text textAlign="center" fontSize="4xl" fontFamily="Work sans">
          iChat
        </Text>
      </Box>
      <Box p={4} bg={"white"} w="100%" borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1rem">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
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
