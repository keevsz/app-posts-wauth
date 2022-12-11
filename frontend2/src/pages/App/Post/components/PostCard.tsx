import { Post } from "@/models/post.model";
import { Image, Row, Text } from "@/styled-components";
import { Column, Space } from "../../Home/styled-components/Container";
import { FormPost, ImageUploaded } from "../styled-components/PostForm.styled";
import {
  ActionsSection,
  IconLike,
  OptionsPost,
  PostContent,
} from "../styled-components/PostList.styled";
import options_post_icon from "@/assets/options_post_icon.png";
import liked_icon from "@/assets/liked_icon.png";
import unliked_icon from "@/assets/unliked_icon.png";
import comments_icon from "@/assets/comments_icon.png";
import { AppStore } from "@/redux/store";
import { useSelector } from "react-redux";
import { alterLike } from "@/services/posts.services";
import { usePostContext } from "../context/PostProvider";
import { getPostAdapter } from "@/adapters/post.adapter";
import { useState } from "react";
import Comments from "../Comments/Comments";
import { formatDistance } from "date-fns";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const userState = useSelector((state: AppStore) => state.user);
  const [showComments, setShowComments] = useState(false);
  const { updateLike } = usePostContext();

  const handleLike = async () => {
    const response = await alterLike({ userId: userState.id, postId: post.id });
    updateLike({ post: getPostAdapter(response) });
  };

  const handleShowComments = async () => {
    setShowComments(!showComments);
  };

  const getDate = () => {
    const date = new Date(2022, 11, 10); // 10 de diciembre de 2022
    const timeSince = formatDistance(date, new Date(), {
      addSuffix: true,
      includeSeconds: true,
    });

    console.log(timeSince); // e.g. "2 days ago"
  };

  return (
    <>
      <Row>
        <Column gap="2px">
          <Image
            style={{ width: "60px", height: "60px" }}
            src={post.user?.pic}
          ></Image>
        </Column>
        <FormPost>
          <PostContent>
            <Text fontSize="0.9rem">{post.user?.name}</Text>
            <Text fontSize="0.9rem">{" " + getDate()}</Text>
            <Space h="5px" w="" />
            <Text fontSize="1rem">{post.description}</Text>
            <Space h="10px" w="" />

            {post.image && <ImageUploaded src={post.image}></ImageUploaded>}
            <ActionsSection>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <IconLike
                  width={"20px"}
                  height={"20px"}
                  src={
                    post.likes.includes(userState.id as never)
                      ? liked_icon
                      : unliked_icon
                  }
                  onClick={handleLike}
                ></IconLike>
              </div>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <IconLike
                  onClick={handleShowComments}
                  width={"20px"}
                  height={"20px"}
                  src={comments_icon}
                ></IconLike>
              </div>
            </ActionsSection>
          </PostContent>

          {showComments ? <Comments post={post}></Comments> : null}

          {post.user?.id == userState.id ? (
            <OptionsPost src={options_post_icon}></OptionsPost>
          ) : (
            ""
          )}
        </FormPost>
      </Row>
      <br />
    </>
  );
};
export default PostCard;
