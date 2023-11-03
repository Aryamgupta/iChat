import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { capatalise } from "../../config/ChatLogic";

const UserListItem = ({ user, handleFunction }) => {
  // const { user } = ChatState();
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="rgba(255, 233, 200, 0.7)"
      _hover={{
        background: "rgba(255, 233, 200, 1)",
      }}
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      className="notificationPannel"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{capatalise(user.name)}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
