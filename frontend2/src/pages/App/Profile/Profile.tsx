import { AppStore } from "@/redux/store";
import { getUserService } from "@/services/users.services";
import { Image, Row, Text } from "@/styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Column, Space } from "../Home/styled-components/Container";
import PostList from "../Post/components/PostList";
import { PostProvider } from "../Post/context/PostProvider";
import { BoxProfile, ProfileBox, ProfileUser } from "./Profile.styled";

const Profile = () => {
  const [user, setUser] = useState({} as any);
  const userGlobal = useSelector((store: AppStore) => store.user);
  const params = useParams();

  const getUser = async () => {
    const response = await getUserService(params.id);
    setUser(response.data);
  };

  useEffect(() => {
    if (params.id) {
      getUser();
      return;
    }
    setUser(userGlobal);
  }, [params.id]);

  return (
    <PostProvider>
      {user.id && (
        <BoxProfile>
          <ProfileBox>
            <ProfileUser>
              <Row style={{ padding: "1rem" }}>
                <Image
                  style={{ width: "120px", height: "120px" }}
                  src={user.pic}
                ></Image>
                <Column gap="1rem" style={{ padding: "2.2rem" }}>
                  <Row>
                    <Text fontSize="1rem">{user.email}</Text>
                  </Row>
                  <Row>
                    <Text fontSize="1rem">{user.name}</Text>
                  </Row>
                </Column>
              </Row>
              <br />
              <br />
              <Text fontSize="1rem">
                Publicaciones <hr />
              </Text>
            </ProfileUser>
          </ProfileBox>
          <Space h="13rem" w="" />
          <PostList></PostList>
        </BoxProfile>
      )}
    </PostProvider>
  );
};
export default Profile;
