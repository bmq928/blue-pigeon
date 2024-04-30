import { registerAs } from '@nestjs/config'
import * as joi from 'joi'

export interface MailerConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export const MAILER_CONFIG_TOKEN = 'mailer'

export const mailerConfig = registerAs(
  MAILER_CONFIG_TOKEN,
  (): MailerConfig => ({
    host: process.env['MAILER_HOST'],
    port: parseInt(process.env['MAILER_PORT']),
    secure: process.env['MAILER_SECURE'] === 'true',
    auth: {
      user: process.env['MAILER_AUTH_USER'],
      pass: process.env['MAILER_AUTH_PASS'],
    },
  }),
)

export const mailerConfigSchema = joi.object({
  MAILER_HOST: joi.string().hostname().required(),
  MAILER_PORT: joi.number().port().required(),
  MAILER_SECURE: joi.bool().default(false),
  MAILER_SERVICE: joi.string().default('gmail'),
  MAILER_AUTH_USER: joi.string().email().required(),
  MAILER_AUTH_PASS: joi.string().required(),
})
