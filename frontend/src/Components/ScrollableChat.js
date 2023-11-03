import React from "react";

import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessasge,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  getSenderComplete,
} from "../config/ChatLogic";
import { ChatState } from "./Context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import animation from "../Animations/typing.json";

const ScrollableChat = ({ messages, isTyping }) => {
  const { user, selectedChat } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessasge(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                ></Avatar>
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                background: "rgb(238,174,202)",
                background: ` linear-gradient(${
                  m.sender._id === user._id ? 270 : 90
                }deg,rgba(238,174,202,0) 0%, rgba(94,46,46,0.8435749299719888) 30%)`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "8px",
                padding: "5px 15px",
                maxWidth: "75%",
                fontSize: "15px",
                color: "white",
              }}
              className="notificationPannel"
            >
              {m.content}
            </span>
          </div>
        ))}
      <div>
        {isTyping ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                mr={1}
                size="sm"
                cursor="pointer"
                name={getSenderComplete(user, selectedChat.users).name}
                src={getSenderComplete(user, selectedChat.users).pic}
              ></Avatar>
              <span>
                <Player
                  autoplay
                  loop
                  src={animation}
                  style={{ height: "30px" }}
                ></Player>
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </ScrollableFeed>
  );
};

export default ScrollableChat;
