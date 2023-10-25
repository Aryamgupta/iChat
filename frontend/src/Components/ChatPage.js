import React, { useEffect, useState } from "react";
import { ChatState } from "./Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "./Missle/SideDrawer";
import MyChats from "./Missle/MyChats";
import ChatBox from "./User Avatar/ChatBox";
import { set } from "mongoose";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        className="chatBoxArrage"
        d="flex"
        justifyContent="space-between"
        w="100%"
        h="92vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
