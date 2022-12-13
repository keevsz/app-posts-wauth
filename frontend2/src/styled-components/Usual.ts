import styled from "styled-components";

export const IconButton = styled.a`
  border-radius: 20%;
  width: 2rem;
  height: 2rem;
  :hover {
    border: 2px solid #00cc4b;
    box-sizing: border-box;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.img<{ type: string }>`
  height: auto;
  transition: all 0.6s;
  transition-delay: 0.15s;
  filter: invert(0.5);
  /* ${(props) =>
    props.theme.name == "dark" && props.type == "icon1"
      ? "filter: invert(0.8);"
      : ""} */
`;

export const Text = styled.span<{ fontSize: string }>`
  transition: color 0.6s;
  transition-delay: 0.15s;
  color: ${(props) => (props.theme.name == "dark" ? "#eee" : "#aaa")};
  font-size: ${(props) => props.fontSize};
  z-index: 30;
`;

export const Title = styled.div`
  font-size: 2.5rem;
  color: ${(props) => props.color};
`;
