import { Box } from "@chakra-ui/react";
import React from "react";

const PrfPost = (props) => {
  return (
    <Box
      style={{
        height: "50px",
        margin: "0px 10px 20px 10px",
        marginTop: "0px",
        marginTop: "0px",
        width: "120px",
        height: "120px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "contain",
        cursor: "pointer",
      }}
      backgroundImage={props.pic}
    ></Box>
  );
};

export default PrfPost;
