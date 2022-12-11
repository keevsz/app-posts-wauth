import styled from "styled-components";

export const PostContent = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.bg3};
  padding: 1.5rem;
  padding-bottom: 0.5rem;
  transition: background-color 0.6s;
  transition-delay: 0.15s;
  position: relative;
`;

export const OptionsPost = styled.img`
  width: 25px;
  top: 0;
  right: 0;
  cursor: pointer;
  transition: all 0.6s;
  transition-delay: 0.15s;
  ${(props) => (props.theme.name == "dark" ? "filter: invert(0.8);" : "")}
  :hover {
    opacity: 0.7;
  }
  position: absolute;
  padding: 1.5rem;
`;

export const ActionsSection = styled.div`
  margin-top: 10px;
  display: flex;
`;

export const IconLike = styled.img`
  cursor: pointer;
`;
