import {
  Avatar,
  Badge,
  Box,
  Button,
  Icon,
  Input,
  Text,
  flexbox,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import ScrollableFeed from "react-scrollable-feed";
import Comments from "./Comments";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { timeCalc } from "../../config/ChatLogic";
import ProfileModal from "../Missle/ProfileModal";

const Post = (props) => {
  const { user } = ChatState();

  const [likeNo, setLikeNo] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [cmt, setCmt] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const mode = props.mode;

  // if (props.data.likedBy.includes(user._id)) {
  //   setIsLiked(true);
  // }

  const likee = () => {
    setLikeNo(props.data.likedBy.length);
    if (props.data.likedBy.includes(user._id)) {
      setIsLiked(true);
    }
  };

  useEffect(() => {
    likee();
  }, []);

  const likeFunc = async () => {
    try {
      const config = {
        headers: {
          token: user.token,
        },
      };

      console.log(config);

      const { data } = await axios.post(
        "/api/post/like",
        { postId: props.data._id },
        config
      );

      setLikeNo(data.length);
      if (data.includes(user._id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentFunc = async (commentedis) => {
    if (!commentedis) setOpenComment(!openComment);
    else setOpenComment(true);
    try {
      const config = {
        headers: {
          token: user.token,
        },
      };

      const { data } = await axios.post(
        "/api/post/getAllComments",
        {
          postId: props.data._id,
        },
        config
      );
      setCmt(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    if (commentContent === "") {
      return;
    }
    try {
      const config = {
        headers: {
          token: user.token,
        },
      };

      document.querySelector(".inputToCmt").value = "";

      const { data } = await axios.put(
        "/api/post/comment",
        {
          postId: props.data._id,
          content: commentContent,
        },
        config
      );
      commentFunc(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        style={{
          borderTopLeftRadius: "48px",
          borderBottomRightRadius: "48px",
        }}
        width={props.widt}
        background={mode.baseBackGround}
      >
        {props.data.pic && (
          <Box
            style={{
              borderTopLeftRadius: "48px",
              height: "300px",
              width: "100%",
              backgroundImage: `url("${props.data.pic}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
          ></Box>
        )}
        {props.data.desc && (
          <Text className="postDes" padding="12px 22px" color={mode.baseFont}>
            {props.data.desc}
          </Text>
        )}
        <Box
          display="flex"
          justifyContent="space-between"
          height="45px"
          padding="22px"
          paddingTop="0px"
          marginBottom="12px"
        >
          <Box display="flex" flexDir="row">
            <ProfileModal user={props.data.userId}>
              <Avatar
                height="45px"
                src={props.data.userId.pic}
                name={props.data.userId.name}
              ></Avatar>
            </ProfileModal>
            <Box
              marginLeft="14px"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
              }}
            >
              <Box className="postUserName" color={mode.baseFont}>
                {props.data.userId.name}
              </Box>
              <p className="postTime" color={mode.baseTime}>
                {timeCalc(new Date() - new Date(props.data.createdAt))}
              </p>
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span className="addPadd" onClick={likeFunc}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 20 20"
                fill={isLiked ? "#FF0000" : "none"}
              >
                <path
                  d="M17.3666 3.84166C16.941 3.41583 16.4356 3.07803 15.8794 2.84757C15.3232 2.6171 14.727 2.49847 14.1249 2.49847C13.5229 2.49847 12.9267 2.6171 12.3705 2.84757C11.8143 3.07803 11.3089 3.41583 10.8833 3.84166L9.99994 4.725L9.1166 3.84166C8.25686 2.98192 7.0908 2.49892 5.87494 2.49892C4.65908 2.49892 3.49301 2.98192 2.63327 3.84166C1.77353 4.70141 1.29053 5.86747 1.29053 7.08333C1.29053 8.29919 1.77353 9.46525 2.63327 10.325L3.5166 11.2083L9.99994 17.6917L16.4833 11.2083L17.3666 10.325C17.7924 9.89937 18.1302 9.39401 18.3607 8.83779C18.5912 8.28158 18.7098 7.6854 18.7098 7.08333C18.7098 6.48126 18.5912 5.88508 18.3607 5.32887C18.1302 4.77265 17.7924 4.26729 17.3666 3.84166V3.84166Z"
                  stroke="#FF0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Text
                fontSize="11px"
                fontWeight="300"
                marginTop="-10px"
                color={mode.baseFont}
              >
                {likeNo}
              </Text>
            </span>
            <span
              className="addPadd"
              onClick={() => {
                commentFunc(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M2.5 9.58333C2.49713 10.6832 2.75411 11.7682 3.25 12.75C3.83797 13.9264 4.74188 14.916 5.86046 15.6077C6.97904 16.2995 8.26813 16.6662 9.58333 16.6667C10.6832 16.6695 11.7682 16.4126 12.75 15.9167L17.5 17.5L15.9167 12.75C16.4126 11.7682 16.6695 10.6832 16.6667 9.58333C16.6662 8.26812 16.2995 6.97904 15.6077 5.86045C14.916 4.74187 13.9265 3.83797 12.75 3.24999C11.7682 2.7541 10.6832 2.49713 9.58333 2.49999H9.16667C7.42971 2.59582 5.78913 3.32896 4.55905 4.55904C3.32897 5.78912 2.59583 7.4297 2.5 9.16666V9.58333Z"
                  stroke={`${mode.baseFont}`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Box>
        </Box>
        {openComment && (
          <Box
            maxHeight="150px"
            overflow="scroll"
            marginBottom="0px"
            // style={{ backgroundColor: "red" }}
            paddingBottom="0px"
            background={mode.baseBackGround}
          >
            {cmt.map((cm) => (
              <Comment cmt={cm} mode={props.mode} />
            ))}
          </Box>
        )}
        <Box
          style={{
            // borderTopWidth: "2px",
            // marginBottom: "10px",
            borderBottomLeftRadius: "20px",
            borderColor:
              "linear-gradient(90deg, rgba(238,174,202,0.5998774509803921) 0%, rgba(94,46,46,0.7483368347338936) 57%)",
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "40px",
            // background: "white",
            // background: "red",
          }}
        >
          <Input
            variant="unstyled"
            style={{ padding: "10px 10px 10px 15px" }}
            className="postTime inputToCmt"
            fontSize="12px"
            fontWeight="300"
            color={mode.baseFont}
            onChange={(e) => {
              setCommentContent(e.target.value);
            }}
          ></Input>
          <Button
            variant="unstyled"
            onClick={handleComment}
            color={mode.baseFont}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_47_617)">
                <path
                  d="M18.3332 1.66666L9.1665 10.8333"
                  stroke={`${mode.baseFont}`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.3332 1.66666L12.4998 18.3333L9.1665 10.8333L1.6665 7.49999L18.3332 1.66666Z"
                  stroke={`${mode.baseFont}`}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_47_617">
                  <rect width="20" height="20" fill="black" />
                </clipPath>
              </defs>
            </svg>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Post;
