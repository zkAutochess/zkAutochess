import { useGameFormStore } from 'entities/game-form'
import { FC, useCallback } from 'react'
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
    const navigate = useNavigate()
    const characters = useGameFormStore((state) => state.characters)
    const clearCharacter = useGameFormStore((state) => state.clearCharacter)

    const clickHandler = useCallback(async () => {
        const { roomId } = await createRoom({
            playerId: 'test',
            warriors: characters.map((character) => character.position),
        })

        clearCharacter()

        navigate(`/game/${roomId}`)
    }, [characters, navigate, clearCharacter])

    return (
        <GameContainer>
            <div>
                <Title>Create room</Title>

                <div style={{ marginTop: 30 }}>
                    <CharacterPool characters={charactersPool} />
                </div>

                <div style={{ marginTop: 50 }}>
                    <Button onClick={clickHandler} view="orange" size="m">
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
