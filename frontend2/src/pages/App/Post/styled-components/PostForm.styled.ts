import styled from 'styled-components'

export const BoxForm = styled.div`
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

export const FormPost = styled.form`
  z-index: 20;
  width: 100%;
  position: relative;
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`

export const InputForm = styled.textarea`
  border-color: ${props=> props.theme.border_color};
  transition: all 0.6s;
  transition-delay: 0.15s;
  resize: none;
  outline: none;
  padding: 1rem 3rem 0.5rem 1rem;
  color: #999;
  font-size: 1.1rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.bg3};
`

export const ImageUploadImage = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    opacity: 50%;
  }
  position: absolute;
  right: 10px;
  top: 5px;
  border-radius: 5px;
`

export const ImageInput = styled.label`
  position: absolute;
  right: 10px;
  top: 5px;
  margin: 0.1rem;
  width: 6rem;
  height: 6rem;
  @media screen and (max-height: 470px) {
    display: none;
  }
`

export const ImageUploaded = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  transition: all 0.6s;
  transition-delay: 0.15s;
  border: 1px solid ${(props) => props.theme.border_color};
`

export const DeleteImgButton = styled.a`
  border-radius: 50%;
  cursor: pointer;
  width: 25px;
  height: 25px;
  position: absolute;
  right: -10px;
  top: -10px;
  font-weight: bold;
  background-color: ${(props) =>
    props.theme.name === 'dark' ? '#808080' : '#ccc'};
  color: ${(props) => (props.theme.name === 'dark' ? '#fff' : '#fff')};
  :hover {
    right: -11px;
    top: -11px;
    width: 27px;
    height: 27px;
    opacity: 0.9;
  }
  transition: all 0.1s;
  transition: background-color 1s;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BoxImageUploaded = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  width: 567px;
  height: 300px;
  color: #999;
`
