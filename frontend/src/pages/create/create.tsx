import { FC } from 'react'
import styled from 'styled-components'
import { Button, Title } from 'shared/ui'
import { GameForm } from 'widgets'

const CreateWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 50px;
`

export const Create: FC = () => {
    return (
        <CreateWrapper>
            <GameForm />
        </CreateWrapper>
    )
}
