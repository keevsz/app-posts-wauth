import styled from 'styled-components'

export const LoginForm = styled.form`
  transition: background-color 0.6s;
  transition-delay: 0.15s;
  background-color: ${(props) => props.theme.bg2};
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  @media screen and (max-height: 550px) {
    gap: 0.3rem;
    width: 50%;
  }
  animation: fadeIn ${props => props.theme.name == 'dark' ? '1.6s' : '0.5s'} ${props => props.theme.name == 'dark' ? '' : 'reverse'};;
  @keyframes fadeIn {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }
`

export const TextInput = styled.input`
  outline: none;
  background-color: transparent;
  padding: 1rem 1rem 0.5rem 1rem;
  color: ${(props) => props.theme.color};
  border: 0;
  border-bottom: 0.1rem solid ${(props) => props.theme.border_input};
  font-size: 1.2rem;
  ::selection {
    background-color: #ccc;
  }
  transition: border-bottom,color 0.6s;
  transition-delay: 0.15s;

  @media screen and (max-width: 330px) {
    width: 50%;
  }
  @media screen and (max-height: 385px) {
    padding: 0.7rem 0.7rem 0.7rem 1.3rem;
  }
`
export const Button = styled.button<{ display: string }>`
  background-color: ${(props) => props.color};
  width: 7rem;
  border: 0.1rem solid white;
  padding: 1rem;
  color: white;
  font-weight: bold;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    background-color: #278048;
  }
  @media screen and (min-width: 1000px) {
    display: ${(props) => props.display};
  }
`

export const BoxRight = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 50%;
  background-color: ${(props) => props.color};
  animation: fadeIn ${props => props.theme.name == 'dark' ? '1.6s' : '0.5s'} ${props => props.theme.name == 'dark' ? '' : 'reverse'};;
    @keyframes fadeIn {
      from{
        opacity: 0;
      }
      to{
        opacity: 1;
      }
    }

  @media screen and (max-width: 1000px) {
    display: none;
    width: 0%;
  }
  @media screen and (max-height: 550px) {
    display: flex;
    width: 50%;
  }
`

export const Title = styled.div`
  font-size: 2.5rem;
  color: ${(props) => props.color};
`
export const Auth = styled.div`
  z-index: 2;
  width: 65%;
  height: 80%;
  display: flex;
  border-radius: 1rem;
  /* box-shadow: 2px 5px 10px 0.1px #666;  */
  @media screen and (max-width: 675px) {
    width: 95%;
    height: 95%;
  }
  @media screen and (max-height: 675px) {
    width: 100%;
    height: 100%;
  }
`
