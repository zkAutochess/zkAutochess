import axios from 'axios'
import { Position } from 'entities'
import { apiUrl } from 'shared/constants/api'

export const createRoom = async (payload: {
    playerId: string
    warriors: Position[]
}): Promise<{ roomId: string }> => {
    return await axios.post(`${apiUrl}/room/create`, payload).then((response) => response.data)
}
