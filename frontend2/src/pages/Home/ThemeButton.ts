import styled from 'styled-components'
import theme from '../../redux/states/theme'

export const ThemeButton = styled.div`
  height: 4rem;
  width: 4rem;
  position: absolute;
  border-radius: 50%;
  right: 1rem;
  top: 1rem;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  animation: fadeIn ${props => props.theme.name == 'dark' ? '1.6s' : '0.5s'} ${props => props.theme.name == 'dark' ? '' : 'reverse'};
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
  border-radius: 50%;
  position: absolute;
  background-color: #eee;
  right: 1rem;
  top: 1rem;
  z-index: 11;
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
