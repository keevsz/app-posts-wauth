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
  transition-delay: ${(props) =>
    props.theme.bg == '#eee' ? '0.6s' : '0s'}; // 0s para uno 0.6 para otro

  user-select: none;
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer */
  -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
  -webkit-user-select: none; /* Chrome, Safari, and Opera */
  -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
`

export const Row = styled.div`
  display: flex;
  gap: 20px;
  @media screen and (max-width: 330px) {
    flex-direction: column;
  }
`
