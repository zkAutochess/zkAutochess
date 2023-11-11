import { StartRestApi } from './rest-api'
import { ValidConfig } from './config'
import { GameManager } from './game'
;(async () => {
  await StartRestApi(ValidConfig.PORT_HTTP)
})()
export const gameManager = new GameManager()
