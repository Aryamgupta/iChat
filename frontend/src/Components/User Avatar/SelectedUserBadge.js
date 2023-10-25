import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";
import React from "react";
import colorVar from "../ColorVaribales";

const SelectedUserBadge = ({ user, handleFunction }) => {
  return (
    <Badge
      px={3}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="outline"
      fontSize={12}
      color={colorVar}
    >
      {user.name}
      <CloseIcon
        size="lg"
        ml={1}
        pl={1}
        onClick={handleFunction}
        cursor="pointer"
      />
    </Badge>
  );
};

export default SelectedUserBadge;
