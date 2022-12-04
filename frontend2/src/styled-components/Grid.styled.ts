import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  gap: 20px;
  @media screen and (max-width: 330px) {
    flex-direction: column;
  }
`
