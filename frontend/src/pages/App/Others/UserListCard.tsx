import { PrivateRoutes, User } from "@/models";
import { Text } from "@/styled-components";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface Props { 
  user: User,
  setFilter: Dispatch<SetStateAction<string>>
}

const UserListCard = ({ user, setFilter }: Props) => {
  return (
    <Link
      onClick={() => {
        setFilter("");
      }}
      to={`${PrivateRoutes.APP}/${user.id}`}
      style={{ zIndex: 20, textDecoration: "none" }}
    >
      <div style={{ cursor: "pointer", padding: "1rem" }}>
        <Text fontSize="0.9rem">{user.name}</Text>
      </div>
    </Link>
  );
};
export default UserListCard;
