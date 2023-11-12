import { Icons } from 'assets'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const ConfirmationsWrapper = styled.div<{ color: string }>`
    position: fixed;

    top: 100px;
    right: 30px;

    padding: 15px;
    border-radius: 10px;

    display: flex;
    align-items: center;

    background-color: ${(props) => props.color};
`

const ConfirmationsLabel = styled.div`
    width: 200px;

    word-break: break-word;

    text-align: center;
`

const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const Confirmations = () => {
    const [text, setText] = useState('Waiting to confirmation on blockchain')

    const runTimer = useCallback(async () => {
        await wait(20_000)

        setText('Game verified on blockchain')
    }, [])

    useEffect(() => {
        runTimer()
    }, [])

    return (
        <ConfirmationsWrapper color={text === 'Game verified on blockchain' ? '#A7FC00' : '#fff'}>
            {text !== 'Game verified on blockchain' && (
                <Icons.Loader style={{ width: 50, height: 50 }} />
            )}

            <ConfirmationsLabel>{text}</ConfirmationsLabel>
        </ConfirmationsWrapper>
    )
}
