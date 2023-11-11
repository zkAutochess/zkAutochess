import axios from 'axios'
import { apiUrl } from 'shared/constants/api'

export const getAllRooms = async (): Promise<string[]> => {
    return axios.get(`${apiUrl}/rooms/available`).then((response) => response.data)
}
