import React, { useEffect, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import Post from "./Post";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { Box, Stack } from "@chakra-ui/react";

const Posts = () => {
  const { user } = ChatState();
  const [posts, setPosts] = useState([]);
  const lightMode = {
    baseBackGround: "#FFF",
    baseFont: "rgba(0, 0, 0, 1)",
    baseTime: "rgba(84, 84, 84, 1)",
  };
  console.log(user);
  //   to fetch all the post
  const fetchPosts = async () => {
    try {
      const config = {
        headers: {
          token: user.token,
        },
      };

      const { data } = await axios.get("/api/post/", config);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Stack overflow="scroll">
        {posts.map((post) => (
          <Post data={post} widt="300px" mode={lightMode} />
        ))}
      </Stack>
    </>
  );
};

export default Posts;
