import styled from "styled-components";

export const ThemeButton = styled.div`
  height: 3rem;
  width: 3rem;
  position: fixed;
  border-radius: 50%;
  right: 1rem;
  top: 1rem;
  z-index: 30;
  display: flex;
  align-items: center;
  background-color: transparent;
  justify-content: center;
  cursor: pointer;
  animation: fadeIn 1.5s ease;
  transition: 0.3s;
  :hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`;

export const Icon = styled.img<{ animation: boolean }>`
  filter: invert(0.5);
  height: auto;
  ${(props) =>
    props.animation &&
    "animation: fadeIn 1.5s ease; @keyframes fadeIn {0%{opacity:0%;}100% {opacity: 100%;}}"}
`;

export const Expand = styled.div<{ animation: boolean }>`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  z-index: 10;
  position: fixed;
  background-color: #eeeeee;
  right: 0.5rem;
  top: 0.5rem;
  ${(props) =>
    props.animation &&
    `
  animation: expandAnimation 0.6s ${
    props.theme.name == "dark" ? "reverse" : ""
  }; 
  @keyframes expandAnimation {
    25% {      
      border-top-right-radius: 0%;      
      right: 0rem;      
      top: 0rem;    
      }    
    100% {      
      right: 0rem;      
      top: 0rem;     
       width: 208vh;      
       height: 100%;      
       border-radius: 0%;    
       }  
    }`}
`;
