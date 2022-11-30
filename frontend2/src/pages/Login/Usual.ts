import styled from 'styled-components'

export const IconButton = styled.a`
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  border: 0.1rem solid #00cc4b;
  :hover {
    background-color: #00cc4b;
    transition: all 0.3s;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Icon = styled.img<{ type: string }>`
  width: 1rem;
  transition: all 0.6s;
  transition-delay: 0.15s;
  ${(props) =>
    props.theme.name == 'dark' && props.type == 'icon1'
      ? 'filter: invert(0.8);'
      : ''}
`

export const Text = styled.span<{ fontSize: string }>`
  transition: color 0.6s;
  transition-delay: 0.15s;
  color: ${(props) => props.theme.name == 'dark' ? '#eee' : 'black'};
  font-size: ${(props) => props.fontSize};
`

export const Title = styled.div`
  font-size: 2.5rem;
  color: ${(props) => props.color};
`

export const Expand = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  z-index: 1;
  position: absolute;
  background-color: #eee;
  right: 1rem;
  top: 1rem;
  animation: expandAnimation 0.6s none;
  transform-style: expandAnimation;
  @keyframes expandAnimation {
    25% {
      border-top-right-radius: 0%;
      right: 0rem;
      top: 0rem;
    }
    100% {
      right: 0rem;
      top: 0rem;
      width: 208vh;
      height: 100vh;
      border-radius: 0%;
    }
  }
`

export const Unexpand = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  z-index: 1;
  position: absolute;
  background-color: #eee;
  right: 1rem;
  top: 1rem;
  animation: expandAnimation 0.6s reverse;
  @keyframes expandAnimation {
    25% {
      border-top-right-radius: 0%;
      right: 0rem;
      top: 0rem;
    }
    100% {
      right: 0rem;
      top: 0rem;
      width: 208vh;
      height: 100vh;
      border-radius: 0%;
    }
  }
`
