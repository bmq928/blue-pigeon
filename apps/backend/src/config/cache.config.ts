import { registerAs } from '@nestjs/config'
import * as joi from 'joi'

export const CACHE_CONFIG_TOKEN = 'cache'

export type CacheConfig = {
  redis: {
    host: string
    port: number
  }
  register: {
    prefix: string
    ttl: number
  }
}

export const cacheConfig = registerAs(
  CACHE_CONFIG_TOKEN,
  (): CacheConfig => ({
    redis: {
      port: parseInt(process.env['CACHE_REDIS_PORT'] ?? '6379'),
      host: process.env['CACHE_REDIS_HOST'] ?? 'localhost',
    },
    register: {
      prefix:
        process.env['CACHE_REGISTER_KEY_PREFIX'] ?? 'register-verify-prefix',
      ttl: parseInt(process.env['CACHE_REGISTER_KEY_TTL'] ?? '600000'),
    },
  }),
)

export const cacheConfigSchema = joi.object({
  CACHE_REDIS_PORT: joi.number().port().default(6379),
  CACHE_REDIS_HOST: joi.string().hostname().default('localhost'),
  CACHE_REGISTER_KEY_TTL: joi.number().integer().default(600000),
  CACHE_REGISTER_KEY_PREFIX: joi.string().default('register-verify-prefix'),
})
