import styled from "styled-components";

export const BoxLoading = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  @media screen and (max-height: 550px) {
    width: 50%;
  }
`;
export const Loader = styled.div`
  border: 3px solid #aaa;
  border-top-color: #eee;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  animation: rotateAnimation ease-in-out 1.3s infinite alternate;
  @keyframes rotateAnimation {
    0% {
      transform: rotate(0deg);

      border-left-color: #fff;
    }
    100% {
      transform: rotate(1080deg);
    }
  }
`;
