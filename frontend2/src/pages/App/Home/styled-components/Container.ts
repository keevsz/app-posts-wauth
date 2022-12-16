import styled from 'styled-components'

export const CenterVH = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Column = styled.div<{ gap: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap};
`

export const NavbarH = styled.div`
  width: 100px;
  transition: all 0.6s;
  transition-delay: 0.15s;
  z-index: 30;
  position: fixed;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${(props) => props.theme.border_color};
  background-color: ${(props) => props.theme.bg3};
  @media screen and (max-width: 800px) {
    display: none;
  }
`

export const NavbarV = styled.div`
  transition: all 0.6s;
  transition-delay: 0.15s;
  position: fixed;
  z-index: 30;
  width: 100px;
  height: 100%;
  background-color: ${(props) => props.theme.bg3};
  img {
    width: 2.5rem;
    margin: auto;
  }
  ::after {
    content: '';
    top: 80px;
    left: 100px;
    position: absolute;
    height: calc(100% - 80px);
    border-right: 1px solid ${(props) => props.theme.border_color};
    box-sizing: border-box;
    transition: all 1s;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`

export const Space = styled.div<{ w: string; h: string }>`
  margin: 0;
  padding: 0;
  width: ${(props) => props.w};
  height: ${(props) => props.h};
`

export const BoxIn = styled.div`
  position: absolute;
  z-index: 32;
  color: white;
  margin: 8rem 8rem;
`

export const NavBarTop = styled.div`
  transition: all 0.6s;
  transition-delay: 0.15s;
  position: fixed;
  z-index: 30;
  width: 100%;
  height: 75px;
  display: none;
  @media screen and (max-width: 800px) {
    background-color: ${(props) => props.theme.bg3};
    display: block;
  }
  background-color: ${(props) => props.theme.bg2};
  img {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 20px;
  }
  ::after {
    content: '';
    top: 80px;
    left: 100px;
    position: absolute;
    height: calc(100% - 80px);
    border-right: 1px solid ${(props) => props.theme.border_color};
    box-sizing: border-box;
    transition: all 1s;
  }
`
