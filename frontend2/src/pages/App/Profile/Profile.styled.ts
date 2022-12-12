import styled from "styled-components";

export const ProfileBox = styled.div`
  width: 775px;
  height: 70px;
  margin: auto;
  padding-left: 100px;
`;

export const ProfileUser = styled.div`
  padding-left: 100px;
  z-index: 20;
  transition: background-color 0.6s;
  transition-delay: 0.15s;
  background-color: ${(props) => props.theme.bg3};
  border-radius: 5px;
  padding: 10px;
  margin: 2rem;
  width: 720px;
  height: 150px;
  margin-top: 120px;
  position: absolute;
`;
