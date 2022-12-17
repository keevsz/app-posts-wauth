import{s as e}from"./index.09fec51b.js";const a=e.div`
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
`,i=e.div`
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
`;export{a as B,i as L};
