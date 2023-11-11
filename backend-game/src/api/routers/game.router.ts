import express from 'express'
import { gameManager } from '../../main' // Импортируйте GameManager

export const ApiRoute = express.Router()

// Роут для создания комнаты
ApiRoute.post('/room/create', async (req, res, next) => {
  try {
    const { playerId, warriors } = req.body
    const roomId = gameManager.createRoom(playerId, warriors) // Команда не требуется
    res.json({ roomId })
  } catch (err: any) {
    next(err)
  }
})

ApiRoute.post('/room/:roomId/join', async (req, res, next) => {
  try {
    const { roomId } = req.params
    const { playerId, warriors } = req.body

    const gameStates = gameManager.joinRoom(roomId, playerId, warriors) // Команда не требуется

    gameStates.states.forEach((state) => {
      console.log(state.field.join('\n'))
      console.log()
    })
    res.json(gameStates)
  } catch (err: any) {
    next(err)
  }
})

// Роут для получения состояния комнаты
ApiRoute.get('/room/:roomId/state', async (req, res, next) => {
  try {
    const { roomId } = req.params
    const gameState = gameManager.getRoomState(roomId)
    if (gameState) {
      //вывод игры в консоль и ответ
      gameState.states.forEach((state) => {
        console.log(state)
      })
      res.json(gameState)
    } else {
      res.status(404).send('Room not found')
    }
  } catch (err: any) {
    next(err)
  }
})

ApiRoute.get('/rooms/available', async (req, res, next) => {
  try {
    const availableRooms = gameManager.getAvailableRooms()
    res.json(availableRooms)
  } catch (err: any) {
    next(err)
  }
})
