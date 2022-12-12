import { getPostsAdapter } from "@/adapters/post.adapter";
import useFetchAndLoad from "@/hooks/useFetchAndLoad";
import { Post } from "@/models/post.model";
import { AppStore } from "@/redux/store";
import { getPosts } from "@/services/posts.services";
import { Image, Row, Text } from "@/styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Column, Space } from "../Home/styled-components/Container";
import PostList from "../Post/components/PostList";
import { PostProvider } from "../Post/context/PostProvider";
import { ProfileBox, ProfileUser } from "./Profile.styled";

const Profile = () => {
  const user = useSelector((store: AppStore) => store.user);
  const { callEndpoint, loading } = useFetchAndLoad();
  const [myPosts, setMyPosts] = useState([]);

  const getMyPosts = async () => {
    const response = await callEndpoint(getPosts());
    const CleanResponse = getPostsAdapter(response);
    const Filtered = CleanResponse.filter(
      (post: Post) => post.user?.id === user.id
    );
    setMyPosts(Filtered);
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <PostProvider>
      <ProfileBox>
        <ProfileUser>
          <Row style={{ padding: "1rem" }}>
            <Image
              style={{ width: "120px", height: "120px" }}
              src={user.pic}
            ></Image>
            <Column gap="1rem" style={{ padding: "1.5rem" }}>
              <Row>
                <Text fontSize="1rem">{user.email}</Text>
              </Row>
              <Row>
                <Text fontSize="1rem">{myPosts.length + " posts"}</Text>
              </Row>
              <Row>
                <Text fontSize="1rem">{user.name}</Text>
              </Row>
            </Column>
          </Row>
          <br />
          <Text fontSize="1rem">
            Mis publicaciones <hr />
          </Text>
        </ProfileUser>
      </ProfileBox>
      <div
        style={{
          margin: "auto",
          width: "720px",
          marginTop: "300px",
          paddingLeft: "100px",
        }}
      >
        <PostList></PostList>
      </div>
    </PostProvider>
  );
};
export default Profile;
