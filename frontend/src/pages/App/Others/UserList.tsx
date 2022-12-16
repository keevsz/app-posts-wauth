import { getUsersAdapter } from "@/adapters";
import { User } from "@/models";
import { TextInput } from "@/pages/Login/styled-components/AuthForm.styled";
import { getUsersFiltered } from "@/services/users.services";
import { useEffect, useState } from "react";
import { BoxUserList } from "./UserList.styled";
import UserListCard from "./UserListCard";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");

  const findUsers = async () => {
    const response = await getUsersFiltered(filter);
    setUsers(getUsersAdapter(response));
  };

  useEffect(() => {
    if (filter == "") return;
    findUsers();
  }, [filter]);

  return (
    <BoxUserList>
      <TextInput
        placeholder={"Buscar usuarios"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFilter(e.target.value);
        }}
        style={{ border: "none", marginTop: "-5px" }}
      ></TextInput>
      {filter &&
        users.map((user: User) => (
          <UserListCard
            setFilter={setFilter}
            key={user.id}
            user={user}
          ></UserListCard>
        ))}
    </BoxUserList>
  );
};
export default UserList;
