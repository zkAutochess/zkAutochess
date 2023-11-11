import { FC } from 'react'
import styled from 'styled-components'
import { JoinForm } from 'widgets'

const JoinWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 50px;
`

export const Join: FC = () => {
    return (
        <JoinWrapper>
            <JoinForm />
        </JoinWrapper>
    )
}
