import { Position } from 'entities'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Person } from '../person'

// Стилизованные компоненты
const PoolContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
`

export const CharacterCard = styled.div`
    z-index: 1;
    color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    cursor: grab;
`

// Пропсы для компонента CharacterPool
type CharacterPoolProps = {
    characters: { name: string }[]
}

export const CharacterPool: React.FC<CharacterPoolProps> = ({ characters }) => {
    return (
        <PoolContainer>
            {characters.map((character, index) => (
                <CharacterItem character={character} key={index}></CharacterItem>
            ))}
        </PoolContainer>
    )
}

const CharacterItem: FC<any> = ({ character }) => {
    return (
        <CharacterCard
            draggable
            onDragStart={(e) => e.dataTransfer.setData('character', JSON.stringify(character))}
        >
            <Person />
            {/* <ul>
                {character.abilities.map((ability) => (
                    <li key={ability.name}>
                        {ability.name}: {ability.description}
                    </li>
                ))}
            </ul> */}
        </CharacterCard>
    )
}
