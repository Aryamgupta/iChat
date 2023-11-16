import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import { timeCalc } from "../../config/ChatLogic";

const Comment = (props) => {
  return (
    <>
      <Box
        style={{
          minHeight: "50px",
          width: "100%",
          borderBottomRightRadius: "20px",
          borderTopLeftRadius: "20px",
          borderColor:
            "linear-gradient(90deg, rgba(238,174,202,0.5998774509803921) 0%, rgba(94,46,46,0.7483368347338936) 57%)",
          borderBottomWidth: "2px",
          padding: "0px 22px 0px 5% ",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "row",
        }}
        id={props.cmt._id}
        color={props.mode.baseFont}
      >
        <Avatar
          marginTop="10px"
          height="30px"
          width="30px"
          src={props.cmt.userPic}
          name={props.cmt.userName}
        ></Avatar>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px",
          }}
        >
          <Text
            className="postTime"
            fontWeight="600"
            fontSize="11px"
            color={props.mode.baseFont}
          >
            {props.cmt.userName}
            {"  "}
            <span
              className="postTime"
              style={{ fontWeight: "200", fontSize: "9px" }}
              color={props.mode.baseTime}
            >
              {timeCalc(new Date() - new Date(props.cmt.createdAt))}
            </span>
          </Text>

          <Text
            className="postTime"
            fontWeight="400"
            fontSize="9px"
            color={props.mode.baseFont}
          >
            {props.cmt.content}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Comment;
