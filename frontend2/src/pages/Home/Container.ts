import styled from 'styled-components'

export const CenterVH = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const FullPage = styled.div`
  background-color: ${(props) => props.theme.bg};
  height: 100vh;
  z-index: 10;
  transition-delay: ${(props) =>
    props.theme.bg == '#FAFAFA' ? '0.6s' : '0s'}; // 0s para uno 0.6 para otro

  user-select: none;
  -moz-user-select: none; 
  -ms-user-select: none; 
  -khtml-user-select: none; 
  -webkit-user-select: none; 
  -webkit-touch-callout: none; 
`

export const Row = styled.div`
  display: flex;
  gap: 20px;
  @media screen and (max-width: 330px) {
    flex-direction: column;
  }
`

export const Column = styled.div<{ gap: string }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap};
`
export const NavbarH = styled.div`
    transition: all 0.6s;
    transition-delay: 0.15s;
    z-index: 30;
    position: absolute;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid ${props => props.theme.border_color};
    background-color:${props => props.theme.bg2};
`

export const NavbarV = styled.div`
    transition: all 0.6s;
    transition-delay: 0.15s;
    position: absolute;
    z-index: 30;
    width: 100px;
    height: 100%;
    background-color:${props => props.theme.bg2};
    img{
      width:2.5rem;
      margin:auto;
    }
    ::after{
      content: '';
      top:80px;
      left:100px;
      position: absolute;
      height:calc(100% - 80px);
      border-right: 1px solid ${props => props.theme.border_color};;
      box-sizing: border-box;
      transition: all 1s;
    }
`

export const Space = styled.div<{ w: string, h: string }>`
  margin:0;
  padding:0;
  width: ${props => props.w};
  height: ${props => props.h};
`

export const BoxIn = styled.div`
  position:absolute;
  z-index:32;
  color:white;
  margin:8rem 8rem;
`