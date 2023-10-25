import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const UserListItem = ({ user, handleFunction }) => {
  // const { user } = ChatState();
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#dfdfdf"
      _hover={{
        background: "#8b7a65",
        color: "white",
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
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
