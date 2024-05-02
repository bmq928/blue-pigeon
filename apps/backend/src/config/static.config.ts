import { registerAs } from '@nestjs/config'
import * as joi from 'joi'

export interface StaticConfig {
  rootPath: string
}

export const STATIC_CONFIG_TOKEN = 'static'

export const staticConfig = registerAs(
  STATIC_CONFIG_TOKEN,
  (): StaticConfig => ({
    rootPath: process.env['STATIC_ROOT_PATH'],
  }),
)

export const staticConfigSchema = joi.object({
  STATIC_ROOT_PATH: joi.string().required(),
})
