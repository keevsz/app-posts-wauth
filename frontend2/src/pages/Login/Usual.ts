import styled from 'styled-components'

export const IconButton = styled.a`
  border-radius: 100%;
  width:2rem;
  height:2rem;
  border: 0.1rem solid #00CC4B;
  :hover{
    background-color: #00CC4B;
    transition: all 0.3s;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Icon = styled.img`
  width: 1rem;
`

export const Text = styled.span<{ fontSize: string }>`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
`

export const Title = styled.div`
  font-size: 2.5rem;
  color: ${props => props.color};
`