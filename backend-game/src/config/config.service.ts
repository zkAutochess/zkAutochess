import { config } from 'dotenv'
import { DEFAULT_HTTP_PORT } from './config.const'
import { configSchema, IConfig } from './config.interface'

config()

export const ValidConfig: IConfig = {
  PORT_HTTP: process.env.PORT_HTTP ? Number(process.env.PORT_HTTP) : DEFAULT_HTTP_PORT,
  PROVE: process.env.PROVE ? Boolean(process.env.PROVE) : false,
  RPC_URL: process.env.RPC_URL!,
  PRIV_KEY: process.env.PRIV_KEY!,
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS!,
}

const resultValidationConfig = configSchema.validate(ValidConfig)

if (resultValidationConfig.error) {
  console.error(`Validate config error: ${resultValidationConfig.error.message}`)
  process.exit(1)
}

console.log('Validate config complete')
