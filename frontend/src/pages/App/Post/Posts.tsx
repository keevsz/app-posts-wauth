import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { PostProvider } from "./context/PostProvider";
import { BoxForm } from "./styled-components/PostForm.styled";

const Posts = () => {
  return (
    <PostProvider>
      <BoxForm>
        <PostForm></PostForm>
        <br />
        <br />
        <PostList></PostList>
      </BoxForm>
    </PostProvider>
  );
};

export default Posts;
