import styled from 'styled-components'

export const LoginForm = styled.form`
    width:50%;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    gap:1rem;  
`

export const TextInput = styled.input`
  outline:none;
  background-color: #EDEDEF;
  padding: 1rem 1rem 1rem 2rem;
  border:0 ;
  font-size: 1.2rem;
  ::selection{
    background-color: #ccc;
  }
`
export const Button = styled.button`
    background-color: ${props => props.color};
    width: 7rem;
    border: 0.1rem solid white;
    padding: 1rem;
    color: white;
    font-weight: bold;
    border-radius: 0.4rem;
    cursor: pointer;
`

export const BoxRight = styled.div`
  justify-content: center;
  align-items: center;
  display:flex;
  flex-direction:column;
  gap:1rem;
  padding:1rem;
  width:50%;
  background-color: ${props => props.color};
`

export const Title = styled.div`
  font-size: 2.5rem;
  color: ${props => props.color};
`
export const Auth = styled.div`
  width:65%;
  height:80%;
  display:flex;
  border-radius: 1rem;
  box-shadow: 2px 5px 10px 0.1px #666;
`