import { Text } from "@/styled-components";
import { useChatContext } from "./context/ChatProvider";

const UserListCard = ({ user }: any) => {
  const { getChat } = useChatContext();

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        getChat(user._id);
      }}
    >
      <Text fontSize="0.7rem">{user.name}</Text>
    </div>
  );
};
export default UserListCard;
