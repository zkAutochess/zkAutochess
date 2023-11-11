import React, { FC } from 'react'
import person from 'assets/images/person.png'
import styled from 'styled-components'

const PersonWrapper = styled.div`
    height: 50px;

    display: flex;
    align-items: flex-end;
`

const PersonImage = styled.img`
    height: 50px;
`

const PersonHealth = styled.div<{ health?: number }>`
    display: ${(props) => (props.health ? 'block' : 'none')};
    width: 4px;

    height: ${(props) => props?.health}%;

    background-color: red;
    border: 1px solid #000;
`

export const Person: FC<any> = ({ health }) => {
    return (
        <PersonWrapper>
            <PersonImage src={`/person2.gif`} />
            <PersonHealth health={health} />
        </PersonWrapper>
    )
}
