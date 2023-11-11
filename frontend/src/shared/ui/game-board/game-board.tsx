import { Character, useGameFormStore } from '../../../entities'
import React, { FC, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import boardBg from 'assets/images/board.png'
import { Person } from '../person'

// Стилизованный контейнер для игрового поля
const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 50px);
    grid-template-rows: repeat(8, 50px);
`

const BoardBackground = styled.div`
    // padding: 154px 150px 150px 150px;
    padding: 123px 120px 120px 120px;

    background-image: url('${boardBg}');
    background-size: 100%;
`

// Стилизованная ячейка поля
const Cell = styled.div<{ disabled?: boolean; character_id?: string | number }>`
    // border: 1px solid #fff;
    width: 50px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;

    cursor: ${(props) => (props.character_id ? 'not-allowed' : 'auto')};

    &:hover {
        background-color: ${(props) => (props.disabled ? '#000' : '#f0f0f0')};
    }
`

const board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null))

export const GameBoard: FC<any> = ({ type = 'create' }) => {
    const addCharacter = useGameFormStore((state) => state.addCharacter)
    const removeCharacter = useGameFormStore((state) => state.removeCharacter)
    const characters = useGameFormStore((state: any) => state.characters)

    const handleDrop = useCallback(
        (rowIndex: number, colIndex: number, e: React.DragEvent) => {
            e.preventDefault()
            const { name } = JSON.parse(e.dataTransfer.getData('character')) as { name: string }
            // Теперь character содержит данные о персонаже, который был перетащен

            addCharacter({ name, position: { x: colIndex, y: rowIndex } })
        },
        [addCharacter],
    )

    const handleClick = useCallback(
        (characterId?: string | number) => {
            return () => {
                if (characterId) {
                    removeCharacter(characterId)
                }
            }
        },
        [removeCharacter],
    )

    const content = useMemo(() => {
        return board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                const character = characters.find(
                    (character: Character) =>
                        character.position.x === colIndex && character.position.y === rowIndex,
                )

                if ((type === 'create' && rowIndex > 4) || (type === 'join' && rowIndex < 4)) {
                    return (
                        <Cell disabled key={`${rowIndex}-${colIndex}`}>
                            {character ? character.name : null}
                        </Cell>
                    )
                }

                return (
                    <Cell
                        onClick={handleClick(character?.id)}
                        character_id={character?.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(rowIndex, colIndex, e)}
                        key={`${rowIndex}-${colIndex}`}
                    >
                        {character ? <Person /> : null}
                    </Cell>
                )
            }),
        )
    }, [characters, handleDrop, handleClick, type])

    return (
        <BoardBackground>
            <BoardContainer>{content}</BoardContainer>
        </BoardBackground>
    )
}
