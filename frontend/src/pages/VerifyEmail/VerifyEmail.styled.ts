import styled from 'styled-components'
export const BoxVerifyEmail = styled.div`
  text-align: center;
  height: auto;
  background-color: ${(props) => props.theme.bg3};
  padding: 5rem;
  border-radius: 0.5rem;
  z-index: 20;
  transition: all 0.6s;
  transition-delay: 0.15s;
  border: 1px solid;
  border-color: ${(props) => props.theme.border_color};
  animation: fadeIn ${(props) => (props.theme.name == 'dark' ? '1s' : '0.4s')};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media screen and (max-width: 800px) {
    display: block;
    padding: 0rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 0;
  }
  @media screen and (max-width: 400px) {
    display: block;
    padding: 0rem;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 0;
  }
`

export const IconVerifyEmail = styled.img`
  margin: auto;
  width: 20%;
`

export const ButtonVerifyEmail = styled.button`
  margin: auto;
  border: 0.1rem solid white;
  padding: 1rem;
  font-weight: bold;
  border-radius: 0.4rem;
  cursor: pointer;
  ${(props) =>
    props.disabled
      ? 'cursor:not-allowed; '
      : ':hover {background-color: #278048;}'}

  color: white;
  background-color: ${(props) => (!props.disabled ? '#00CC4B' : '#278048')};
`
