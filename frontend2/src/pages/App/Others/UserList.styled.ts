import styled from "styled-components";

export const BoxUserList = styled.div`
  margin-top: 15px;
  margin-left: calc(50% - 40px);
  width: 250px;
  border-radius: 5px;
  border: 1px solid gray;
  background-color: ${(props) => props.theme.bg3};
  transition: all 0.6s;
  transition-delay: 0.15s;
`;
