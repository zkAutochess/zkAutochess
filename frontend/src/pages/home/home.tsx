import { FC, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { getAllRooms } from 'shared/api'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Title } from 'shared/ui'

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const RoomsContainer = styled.div`
    margin-top: 20px;

    display: flex;
    flex-direction: column;
`

export const Home: FC = () => {
    return (
        <HomeWrapper>
            <Title>Rooms</Title>
            <Rooms />
        </HomeWrapper>
    )
}

const RoomItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    text-decoration: none;

    font-size: 32px;
    font-weight: 600;

    color: #fff;

    border-bottom: 1px solid #fff;
    padding: 15px 0px;
`

const Rooms = () => {
    const { data } = useQuery({
        queryFn: getAllRooms,
        queryKey: 'allRooms',
    })
    const navigate = useNavigate()

    const handleClick = useCallback(
        (roomId: string) => {
            return () => {
                navigate(`/join/${roomId}`)
            }
        },
        [navigate],
    )

    const content = useMemo(() => {
        if (!data) return

        return data.map((room) => (
            <RoomItem>
                {room}
                <Button onClick={handleClick(room)} view="orange" size="m">
                    Join
                </Button>
            </RoomItem>
        ))
    }, [data, handleClick])

    return <RoomsContainer>{content}</RoomsContainer>
}
