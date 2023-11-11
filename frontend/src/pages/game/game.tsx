import { FC, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Title } from 'shared/ui'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { getRoomState } from 'shared/api'
import { GamePlayer } from 'widgets'

const CreateWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

var gamePlayerInterval: null | NodeJS.Timer = null

export const Game: FC = () => {
    const { id } = useParams() as { id: string }

    const { data, refetch } = useQuery({
        queryFn: () => getRoomState(id),
        queryKey: 'gamePlayer',
    })

    const isStarted = useMemo(() => {
        if (!data) return false

        if (!data.states.length) return false

        return true
    }, [data])

    useEffect(() => {
        if (!isStarted) {
            gamePlayerInterval = setInterval(() => {
                refetch()
            }, 2_000)
        } else {
            if (gamePlayerInterval) clearInterval(gamePlayerInterval)
        }

        return () => {
            if (gamePlayerInterval) clearInterval(gamePlayerInterval)
        }
    }, [isStarted])

    return (
        <CreateWrapper>
            <Title>Room - {id}</Title>

            {isStarted && data ? <GamePlayer data={data} /> : <Title>Waiting enemy</Title>}
        </CreateWrapper>
    )
}
