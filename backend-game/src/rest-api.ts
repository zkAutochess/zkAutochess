import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { ApiRoute } from './api/routers'
import { ErrorHandlerMiddleware } from './api/middleware'

export const StartRestApi = async (port: number): Promise<void> => {
  const app = express()

  app.use(bodyParser.json())
  app.use(cors({ origin: true }))
  app.use(express.urlencoded({ extended: true }))

  app.use('/api', ApiRoute)

  app.use(ErrorHandlerMiddleware)

  app.listen(port, () => {
    console.log(`Rest api running on port ${port}`)
  })
}
