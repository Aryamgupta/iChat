import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "../SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      className={`${!selectedChat ? "none" : "dflex"} res-dflex chatBox`}
      d={{ md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      w={{ base: "100%", md: "68%" }}
      style={{
        height: "100%",
        borderRadius: "32px",
        background: "#FFE9C8",
        boxShadow:
          " 4px 4px 8px 0px rgba(255, 198, 112, 0.60), -4px -4px 8px 0px rgba(255, 198, 112, 0.60)",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
