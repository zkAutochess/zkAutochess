import Joi from '@hapi/joi'

export interface IConfig {
  PORT_HTTP: number
  PROVE: boolean
  RPC_URL: string
  PRIV_KEY: string
  CONTRACT_ADDRESS: string
}

export const configSchema = Joi.object<IConfig>({
  PORT_HTTP: Joi.number().required(),
  PROVE: Joi.boolean().required(),
  RPC_URL: Joi.string().required(),
  PRIV_KEY: Joi.string().required(),
  CONTRACT_ADDRESS: Joi.string().required(),
})
