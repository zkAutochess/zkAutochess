import { usePrivy } from '@privy-io/react-auth'
import { useGameFormStore } from 'entities/game-form'
import { FC, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { createRoom } from 'shared/api'
import { Button, CharacterPool, GameBoard, Title } from 'shared/ui'
import styled from 'styled-components'

const GameContainer = styled.div<{ disabled?: boolean }>`
    margin-top: 20px;

    width: 100%;
    display: flex;
    justify-content: space-between;
`

const charactersPool: { name: string }[] = [
    {
        name: 'VOIN',
    },
]

export const GameForm: FC = () => {
    const { user } = usePrivy()

    const address = useMemo(() => user?.wallet?.address, [user])
    const navigate = useNavigate()
    const characters = useGameFormStore((state) => state.characters)
    const clearCharacter = useGameFormStore((state) => state.clearCharacter)

    const clickHandler = useCallback(async () => {
        const { roomId } = await createRoom({
            playerId: address as string,
            warriors: characters.map((character) => character.position),
        })

        clearCharacter()

        navigate(`/game/${roomId}`)
    }, [characters, navigate, clearCharacter, address])

    return (
        <GameContainer>
            <div style={{ marginTop: 100 }}>
                <Title>Create room</Title>

                <div style={{ marginTop: 30 }}>
                    <CharacterPool characters={charactersPool} />
                </div>

                <div style={{ marginTop: 50 }}>
                    <Button disabled={!address} onClick={clickHandler} view="orange" size="m">
                        Create
                    </Button>
                </div>
            </div>

            <div style={{ marginRight: 100 }}>
                <GameBoard />
            </div>
        </GameContainer>
    )
}
