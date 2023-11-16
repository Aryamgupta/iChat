import React, { useEffect, useState } from "react";
import { ChatState } from "./Context/ChatProvider";
import { Box, Spinner } from "@chakra-ui/react";
import SideDrawer from "./Missle/SideDrawer";
import MyChats from "./Missle/MyChats";
import ChatBox from "./User Avatar/ChatBox";
import { set } from "mongoose";
import { SpinnerIcon } from "@chakra-ui/icons";
import PostPage from "./Posts/PostPage";

const ChatPage = () => {
  const { user, postPage, selectedChat } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  const [loading, setLoading] = useState(true);

  const heightt = window.innerHeight - 70;

  var neededInterval = setInterval(myFunc, 1000);

  function myFunc() {
    if (user !== null) {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <Box
          width="100%"
          className="chatPae"
          display="flex"
          justifyContent="center"
          alignItems="center"
          margin="auto"
        >
          <Spinner size="xl" color="rgba(94, 46, 46, 1)" />
        </Box>
      ) : (
        <div style={{ width: "100%" }}>
          {user !== null && <SideDrawer link="/posts" />}
          <Box
            className="chatBoxArrage"
            d="flex"
            justifyContent="space-between"
            w="100%"
            h={heightt}
            p="10px"
          >
            {user !== null && (window.innerWidth > "768" || !postPage) && (
              <MyChats fetchAgain={fetchAgain} />
            )}

            {user !== null && postPage && !selectedChat && <PostPage />}
            {user !== null && (!postPage || selectedChat) && (
              <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </Box>
        </div>
      )}
      <></>
    </>
  );
};

export default ChatPage;
