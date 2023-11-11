import Joi from '@hapi/joi'

export interface IConfig {
  PORT_HTTP: number
}

export const configSchema = Joi.object<IConfig>({
  PORT_HTTP: Joi.number().required(),
})
