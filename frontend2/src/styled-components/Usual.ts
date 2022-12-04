import styled from 'styled-components'

export const IconButton = styled.a`
  border-radius: 25%;
  width: 2rem;
  height: 2rem;
  :hover {
    background-color: #00cc4b;
    transition: all 0.3s;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Icon = styled.img<{ type: string }>`
  height: auto;
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