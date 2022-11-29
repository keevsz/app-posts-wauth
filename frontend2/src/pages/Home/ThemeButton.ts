import styled from 'styled-components'

export const ThemeButton = styled.div`
  height: 3.3rem;
  width: 3.3rem;
  border-radius: 50%;
  position: absolute;
  right: 1rem;
  z-index: 2;
  top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  cursor: pointer;
  :hover {
    background-color: #ddd;
  }
`
