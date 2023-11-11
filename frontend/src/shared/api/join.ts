import axios from 'axios'
import { Position } from 'entities/game-form'
import { apiUrl } from 'shared/constants/api'
import { Game } from 'shared/types'

export const joinRoom = async (
    roomId: string,
    payload: {
        playerId: string
        warriors: Position[]
    },
): Promise<Game> => {
    return await axios
        .post(`${apiUrl}/room/${roomId}/join`, payload)
        .then((response) => response.data)
}
