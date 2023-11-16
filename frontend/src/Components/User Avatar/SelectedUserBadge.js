import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";
import React from "react";

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
      color="rgba(94, 46, 46, 1)"
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
