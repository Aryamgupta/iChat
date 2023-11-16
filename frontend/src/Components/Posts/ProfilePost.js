import { Box, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PrfPost from "./PrfPost";
import axios from "axios";
import Post from "./Post";
import { ChatState } from "../Context/ChatProvider";

const ProfilePost = (props) => {
  const { isPostShow, setIsPostShow } = ChatState();
  const [postData, setPostData] = useState([]);
  const [FullPost, setFullPost] = useState({});
  const [loading, setLoading] = useState(false);

  const uId = props.userId;

  const fetchPosts = async () => {
    if (!uId) {
      console.log("no UserId");
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };

      const { data } = await axios.get(`api/post/getUserPosts/${uId}`, config);
      setPostData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const darkMode = {
    baseBackGround: "",
    baseFont: "rgba(255, 255, 255, 1)",
    baseTime: "rgba(255,255,255,0.6)",
  };

  return (
    <>
      <Box
        style={{
          height: "300px",
          overflow: "scroll",
          display: "flex",
          flexWrap: "wrap",
          //   alignItems: "center",
          //   marginLeft: "10px",
          //   justifyContent: "space-evenly",
        }}
      >
        {loading && (
          <Spinner width="50px" height="50px" margin="auto auto"></Spinner>
        )}
        {!loading && postData.length === 0 && (
          <Text textAlign="center" fontWeight="300" margin="auto auto">
            No Post 🥲🥲
          </Text>
        )}
        {!isPostShow ? (
          postData.map((prfPo) => (
            <Box
              onClick={() => {
                setFullPost(prfPo);
                setIsPostShow(true);
              }}
            >
              <PrfPost pic={prfPo.pic}></PrfPost>
            </Box>
          ))
        ) : (
          <Box
            style={{
              height: "300px",
              width: "100%",
              overflowX: "hidden",
              display: "flex",
              justifyContent: "center",
              //   background: "red",
            }}
          >
            <Post data={FullPost} widt="280px" mode={darkMode} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProfilePost;
