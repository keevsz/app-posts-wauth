import styled from 'styled-components'

export const ProfileUser = styled.div`
  z-index: 20;
  transition: background-color 0.6s;
  transition-delay: 0.15s;
  background-color: ${(props) => props.theme.bg3};
  border-radius: 5px;
  width: 650px;
  height: 170px;
  position: absolute;
  @media screen and (max-width: 800px) {
    width: 90%;
    padding-left: 0px;
  }
`

export const BoxProfile = styled.div`
  transition: all 0.6s;
  transition-delay: 0.15s;
  padding-top: 120px;
  width: 650px;
  padding-left: 100px;
  margin: auto;
  @media screen and (max-width: 800px) {
    padding-top: 100px;
    width: 90%;
    padding-left: 0px;
  }
`
