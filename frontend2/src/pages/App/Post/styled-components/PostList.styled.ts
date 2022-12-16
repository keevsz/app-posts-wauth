import styled from "styled-components";

export const PostContent = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.name ==='dark'? props.theme.bg2 : '#fff'};
  padding: 1.5rem;
  padding-bottom: 0.5rem;
  transition: background-color 0.6s;
  transition-delay: 0.15s;
  position: relative;
  word-break: break-word;
`;

export const OptionsPost = styled.div`
  border-radius: 50%;
  width: 5px;
  height: 10px;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: all 0.6s;
  transition-delay: 0.15s;
  color: white;
  :hover {
    opacity: 0.7;
  }
  position: absolute;
  padding: 0.5rem;
`;

export const ActionsSection = styled.div`
  margin-top: 10px;
  display: flex;
`;

export const IconLike = styled.img`
  filter: invert(0.7);
  cursor: pointer;
`;
