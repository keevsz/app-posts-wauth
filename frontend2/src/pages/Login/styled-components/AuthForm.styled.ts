import styled from "styled-components";

export const Form = styled.form`
  transition: background-color 0.6s;
  transition-delay: 0.15s;
  background-color: ${(props) => props.theme.bg3};
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.1rem;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  @media screen and (max-height: 550px) {
    gap: 0.3rem;
    width: 50%;
  }
  animation: fadeIn ${(props) => (props.theme.name == "dark" ? "1s" : "0.4s")};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const TextInput = styled.input`
  outline: none;
  background-color: transparent;
  padding: 1rem 1rem 0.5rem 1rem;
  color: #999;
  font-size: 1.1rem;

  ::placeholder {
    color: ${(props) => (props.theme.name == "dark" ? "#fafafa" : "eee")};
    opacity: 0.6;
    font-size: 16px;
    transition: color 0.6s;
    transition-delay: 0.3s;
  }

  border-color: ${(props) => props.theme.color};

  border: 0;
  border-bottom: 0.1rem solid #00cc4b;
  ::selection {
    background-color: #ccc;
  }
  transition: color 0.6s;
  transition-delay: 0.3s;

  @media screen and (max-height: 385px) {
    padding: 0.7rem 0.7rem 0.7rem 1.3rem;
  }
`;
export const Button = styled.button<{ display: string }>`
  background-color: ${(props) => props.color};
  width: 7rem;
  border: 0.1rem solid
    ${(props) => (props.display == "right" ? "#fff" : "transparent")};
  padding: 1rem;
  color: #fff;
  font-weight: bold;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    background-color: #278048;
  }
  @media screen and (min-width: 1000px) {
    display: ${(props) => props.display};
  }
`;

export const BoxRight = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 50%;
  background-color: ${(props) => props.color};
  animation: fadeIn ${(props) => (props.theme.name == "dark" ? "1s" : "0.4s")};

  @media screen and (max-width: 1000px) {
    display: none;
    width: 0%;
  }
  @media screen and (max-height: 550px) {
    display: flex;
    width: 50%;
  }
`;

export const Title = styled.div`
  font-size: 2.5rem;
  color: #cccccc;
`;
export const Auth = styled.div`
  z-index: 29;
  width: 65%;
  height: 80%;
  display: flex;
  border-radius: 1rem;
  /* box-shadow: 2px 5px 10px 0.1px #666;  */
  @media screen and (max-width: 675px) {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-height: 675px) {
    width: 100%;
    height: 100%;
  }
`;

export const BoxInput = styled.div`
  position: relative;
`;

export const ToolTip = styled.div<{ text: string | undefined }>`
  color: #e65d1a;
  display: inline-block;
  position: absolute;
  right: 1rem;
  top: 1rem;
  :hover {
    :after {
      ${(props) => `content: "${props.text}"`};
      position: absolute;
      bottom: 100%;
      left: -1rem;
      color: white;
      width: auto;
      text-align: center;
      font-size: 10px;
      background-color: #121624;
      border: 1px solid white;
      padding: 0.5rem 0.5rem;
      animation: fadeIn
        ${(props) => (props.theme.name == "dark" ? "0.1s" : "0s")};
    }
  }
`;
