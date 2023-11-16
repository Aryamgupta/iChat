import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import Post from "./Post";
import Posts from "./Posts";
import PostModal from "../Missle/PostModal";

const PostPage = () => {
  return (
    <>
      <Box
        p={3}
        w={{ base: "100%", md: "68%" }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          borderRadius: "32px",
          overflow: "scrollY",
        }}
      >
        <Posts />
      </Box>
    </>
  );
};

export default PostPage;
