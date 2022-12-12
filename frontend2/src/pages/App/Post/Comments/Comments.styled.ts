import styled from "styled-components";

export const BoxComments = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.bg3};
  transition: background-color 0.6s;
  transition-delay: 0.15s;
  position: relative;
  margin-top: -14px;
  padding: 1.5rem;
`;

export const CommentFormAnimation = styled.div`
  animation: downAnimation 0.6s;
  z-index: -10;
  position: relative;
  @keyframes downAnimation {
    0% {
      margin-top: -100px;
      opacity: 0;
    }
    100% {
      margin-top: 0px;
    }
  } ;
`;

export const CommentsAnimation = styled.div``

export const InputNewComment = styled.input`
  outline: none;
  border-radius: 10px;
  border: 0;
  background-color: ${(props) => props.theme.bg2};
  width: 94%;
  font-size: 16px;
  color: #999;
  display: flex;
  margin: auto;
  padding: 0.7rem 1rem;

  ::placeholder {
    color: ${(props) => (props.theme.name == "dark" ? "#fafafa" : "eee")};
    opacity: 0.6;
    font-size: 16px;
    transition: color 0.6s;
    transition-delay: 0.3s;
  }

  border: 0;
  ::selection {
    background-color: #ccc;
  }
  transition: all 0.6s;
  transition-delay: 0.15s;

  @media screen and (max-width: 330px) {
    width: 50%;
  }
  @media screen and (max-height: 385px) {
    padding: 0.7rem 0.7rem 0.7rem 1.3rem;
  }
`;

export const BoxCommentCard = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;
export const CommentDescription = styled.div`
  background-color: ${(props) => props.theme.bg2};
  transition: all 0.6s;
  transition-delay: 0.15s;
  border-radius: 10px;
  margin-left: -5px;
  max-width: 80%;
  padding: 0.6rem 0.6rem;
  word-wrap: break-word;
`;

export const DeleteCommentButton = styled.a`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: -17px;
  color: white;
  :hover {
    opacity: 0.8;
    cursor: pointer;
    background-color: ${(props) => props.theme.bg2};
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;
