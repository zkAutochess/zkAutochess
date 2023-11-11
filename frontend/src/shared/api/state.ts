import axios from 'axios'
import { apiUrl } from 'shared/constants/api'
import { Game } from 'shared/types'

export const getRoomState = async (roomId: string): Promise<Game> => {
    return await axios.get(`${apiUrl}/room/${roomId}/state`).then((response) => response.data)
}
