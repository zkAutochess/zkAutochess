import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Game } from 'shared/types'
import { Person } from 'shared/ui'
import styled from 'styled-components'
import board from 'assets/images/board.png'

const GameContainer = styled.div<{ disabled?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const GameBackground = styled.div`
    margin-top: 20px;
    // padding: 154px 150px 150px 150px;
    padding: 97px 95px 95px 95px;

    background-image: url('${board}');
    background-size: 100%;
`

const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const GamePlayer: FC<{ data: Game; setGameEnded: any }> = ({ data, setGameEnded }) => {
    const calculateBoard = (
        warriors: Array<{
            id: number
            team: number
            health: number
            x: number
            y: number
        }>,
    ) => {
        const board = Array(8)
            .fill(null)
            .map((el) => Array(8).fill(null))

        for (let warrior of warriors) {
            board[warrior.y][warrior.x] = warrior
        }

        return board
    }

    const [board, setBoard] = useState(calculateBoard(data.states[0]?.warriors ?? []))

    const playGame = useCallback(async () => {
        for (let i = 1; i < data.states.length; i++) {
            await wait(1_000)

            const item = data.states[i].warriors

            const board = calculateBoard(item)

            if (i == data.states.length - 1) {
                setGameEnded(true)
            }

            setBoard(board)
        }
    }, [data])

    useEffect(() => {
        if (data) {
            playGame()
        }
    }, [data])

    return (
        <GameBackground>
            <GameContainer>
                <GameBoard board={board} />
            </GameContainer>
        </GameBackground>
    )
}

// Стилизованный контейнер для игрового поля
const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 40px);
    grid-template-rows: repeat(8, 40px);
`

// Стилизованная ячейка поля
const Cell = styled.div<{ disabled?: boolean; character_id?: string | number }>`
    // border: 1px solid #fff;
    width: 40px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #000;

    cursor: ${(props) => (props.character_id || props.disabled ? 'not-allowed' : 'auto')};

    &:hover {
        // background-color: ${(props) => (props.disabled ? '#f0f0f0' : '#f0f0f0')};
    }
`

export const GameBoard: FC<{
    board: Array<
        Array<null | {
            id: number
            team: number
            health: number
        }>
    >
}> = ({ board }) => {
    const content = useMemo(() => {
        return board.map((row, rowIndex) =>
            row.map((character, colIndex) => {
                return (
                    <Cell disabled key={`${rowIndex}-${colIndex}`}>
                        {character ? <Person {...character} /> : null}
                    </Cell>
                )
            }),
        )
    }, [board])

    return <BoardContainer>{content}</BoardContainer>
}
