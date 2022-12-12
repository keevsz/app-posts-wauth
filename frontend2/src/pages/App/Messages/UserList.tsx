import { TextInput } from "@/pages/Login/styled-components/AuthForm.styled";
import { getUsersFiltered } from "@/services/users.services";
import { Text } from "@/styled-components";
import { useEffect, useState } from "react";
import UserListCard from "./UserListCard";

const UserList = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  const findUsers = async () => {
    const response = await getUsersFiltered(filter);
    if (filter === "") return setUsers([]);
    setUsers(response.data);
  };

  useEffect(() => {
    findUsers();
  }, [filter]);

  return (
    <div>
      <Text fontSize="1rem">Buscar usuarios</Text>
      <TextInput
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      ></TextInput>
      {users.map((user: any) => (
        <UserListCard key={user._id} user={user}></UserListCard>
      ))}
    </div>
  );
};
export default UserList;
