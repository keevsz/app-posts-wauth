import styled from 'styled-components'
export const Avatar = styled.label`
  margin: 0.1rem;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  display: block;
  @media screen and (max-height: 470px) {
    display: none;
  }
`
export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  cursor:pointer;
  transition: all 0.3s;
  :hover{
    opacity:50%;
  }
`

export const InputImage = styled.input`
  display: none;
`
