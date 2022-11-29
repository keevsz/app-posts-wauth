import styled from 'styled-components'

export const ThemeButton = styled.div`
  height: 4rem;
  width: 4rem;
  position: absolute;
  border-radius: 50%;
  right: 0.7rem;
  top: 0.7rem;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  animation: fadeIn 1s ease;
  @keyframes fadeIn {
    0% {
      opacity: 100%;
    }
    100% {
      opacity: 0%;
    }
  }
`

export const ThemeButton2 = styled.div`
  height: 4rem;
  width: 4rem;
  position: absolute;
  border-radius: 50%;
  right: 0.7rem;
  top: 0.7rem;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: fadeIn 1s ease;
  @keyframes fadeIn {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`
