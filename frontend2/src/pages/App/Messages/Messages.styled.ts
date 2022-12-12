import styled from "styled-components";

export const MessageBox = styled.div`
  width: 775px;
  height: 70px;
  margin: auto;
`;

export const MessageUser = styled.div`
  background-color: ${(props) => props.theme.bg3};
  border-radius: 5px;
  padding: 10px;
  width: 720px;
  height: 150px;
  margin-top: 120px;
  position: absolute;
`;
