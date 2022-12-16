import styled from "styled-components";

export const FullPage = styled.div`
  background-color: ${(props) => props.theme.bg};
  z-index: 10;
  transition-delay: ${(props) => (props.theme.bg == "#eeeeee" ? "0.6s" : "0s")};
  min-height: 100vh;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
`;
