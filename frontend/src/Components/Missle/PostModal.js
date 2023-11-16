import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  Box,
  Img,
  InputGroup,
  Textarea,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";

const PostModal = ({ children }) => {
  const { user } = ChatState();
  const [postPic, setpostPic] = useState();
  const [loading, setLoading] = useState(false);
  const [picWidth, setPicWidth] = useState("250px");
  const [picHeight, setPicHeight] = useState("250px");
  const [postDes, setPostDes] = useState();
  useEffect(() => {
    console.log();
    const addIm = document.getElementsByClassName("addToImg")[0];

    addIm &&
      (addIm.innerHTML = `<img src = "${postPic}" style={{width:"${picWidth}",height:"${picHeight}" }} />`);
  }, [postPic]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const postThePost = async () => {
    if (!postDes || !postPic) {
      console.log("not worked");
      return;
    } else {
      try {
        const config = {
          headers: {
            token: user.token,
          },
        };

        const { data } = await axios.post(
          "/api/post/",
          {
            desc: postDes,
            pic: postPic,
          },
          config
        );

        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  //
  const postDetails = async (pics) => {
    setLoading(true);
    // for cheecking if pic is presend or not
    if (
      pics != undefined &&
      (pics.type === "image/jpeg" || pics.type === "image/png")
    ) {
      const daa = new FormData();
      daa.append("file", pics);
      daa.append("upload_preset", "iChat-App");
      daa.append("cloud_name", "dy4gud84y");
      const { data } = await axios
        .post("https://api.cloudinary.com/v1_1/dy4gud84y/image/upload", daa)
        .catch((error) => {
          console.log("Cloudinary error:", error);
          setLoading(false);
        });

      setPicHeight(data.height);
      setPicWidth(data.width);
      setpostPic(data.url);
    }
    // handles error if pic is not present or not of defined type
    else {
      setLoading(false);
      return;
    }
  };

  const setImgToback = async (pics) => {
    await postDetails(pics);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        variant="unstyled"
        fontSize="35px"
        color="white"
        fontWeight="300"
      >
        +
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          style={{
            color: "white",
            width: "300px",
            borderRadius: "28px",
            background: "#252525",
            boxShadow: "3px 3px 10px 0px #CACACA, -3px -3px 10px 0px #CACACA",
            backdropFilter: "blur(184px)",
            background:
              "radial-gradient(56.57% 56.57% at 32.61% 26.4%, #FFE9C8 0%, #3D3939 0.01%, #161616 100%)",
          }}
          className="postTime"
        >
          <ModalHeader className="postTime" fontSize="20px">
            New Post
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <InputGroup>
                <Textarea
                  onChange={(e) => {
                    setPostDes(e.target.value);
                  }}
                  variant="unstyled"
                  type="text"
                  required
                  background="red"
                  border="0px"
                  className="postTime"
                  fontSize="13px"
                  margin="20px 0px 0px 0px"
                  padding="10px"
                  fontWeight={"200"}
                  placeholder="Post Description....."
                  style={{
                    borderRadius: "14px",
                    background: "#252525",
                    boxShadow:
                      "3px 3px 10px 0px rgba(202, 202, 202, 0.35), -3px -3px 10px 0px rgba(202, 202, 202, 0.35)",
                    backdropFilter: "blur(89px)",
                  }}
                ></Textarea>
              </InputGroup>
              <InputGroup>
                {loading ? "loading" : ""}
                <label
                  style={{
                    marginTop: "20px",
                    width: "100px",
                    height: "100px",
                    cursor: "pointer",
                    borderRadius: "14px",
                    background: "#252525",
                    boxShadow:
                      "3px 3px 10px 0px rgba(202, 202, 202, 0.35), -3px -3px 10px 0px rgba(202, 202, 202, 0.35)",
                    backdropFilter: "blur(89px)",
                  }}
                >
                  <Input
                    style={{
                      width: "100px",
                      height: "100px",
                      //   border: "1px solid black",
                      // display: "none",
                    }}
                    type="file"
                    hidden
                    onChange={(e) => {
                      setImgToback(e.target.files[0]);
                    }}
                    required
                  />
                  <div
                    style={{
                      width: "100px",
                      height: "100px",

                      // marginTop: "-100px",
                      textAlign: "center",
                      lineHeight: "100px",
                      fontSize: "50px",
                      fontWeight: "300",
                      //   border: "1px solid black",
                    }}
                    className="addToImg"
                  >
                    {loading ? <Spinner /> : "+"}
                  </div>
                </label>
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={postThePost}
              style={{
                color: "#5D2E2E",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "600",
                lineheight: "normal",
                letterSpacing: "1.3px",
                borderRadius: "14px",
                background: "#FFCCF4",
                boxShadow:
                  "4px 4px 8px 0px rgba(255, 128, 227, 0.25), -4px -4px 8px 0px rgba(255, 128, 227, 0.25), 4px 4px 8px 0px rgba(255, 128, 227, 0.25) inset",
              }}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostModal;
