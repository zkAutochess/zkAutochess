import { config } from 'dotenv'
import { DEFAULT_HTTP_PORT } from './config.const'
import { configSchema, IConfig } from './config.interface'

config()

export const ValidConfig: IConfig = {
  PORT_HTTP: process.env.PORT_HTTP ? Number(process.env.PORT_HTTP) : DEFAULT_HTTP_PORT,
}

const resultValidationConfig = configSchema.validate(ValidConfig)

if (resultValidationConfig.error) {
  console.error(`Validate config error: ${resultValidationConfig.error.message}`)
  process.exit(1)
}

console.log('Validate config complete')
