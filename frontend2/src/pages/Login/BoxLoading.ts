import styled from 'styled-components'

export const BoxLoading = styled.form`
    width:50%;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
`
export const Loader = styled.form`
  border: 5px solid #00CC4B;
  border-top-color: white;
  border-radius: 50%;
  animation: rotateAnimation ease-in-out 1.3s infinite alternate;
  @keyframes rotateAnimation {
    0%{
      transform:rotate(0deg);
      height: 25px;
      width: 25px;
      border-left-color: #fff;
    }    
    100%{
      transform:rotate(1080deg);
      width:50px;
      height: 50px;
    }
  }
`