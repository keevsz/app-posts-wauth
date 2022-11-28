import styled from 'styled-components'

export const CenterVH = styled.div`
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
`
export const FullPage = styled.div`
    height: 100vh;
`

export const Row = styled.div`
    display:flex;
    gap:20px;
    @media screen and (max-width: 330px) {
        flex-direction:column;
    }     
`