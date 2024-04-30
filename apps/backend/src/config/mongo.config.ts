import { registerAs } from '@nestjs/config';
import * as joi from 'joi';

export interface MongoConfig {
  port: number;
  host: string;
  username: string;
  password: string;
}

export const MONGO_CONFIG_TOKEN = 'mongo';

export const mongoConfig = registerAs(
  MONGO_CONFIG_TOKEN,
  (): MongoConfig => ({
    port: parseInt(process.env['MONGO_PORT'] ?? '27017'),
    host: process.env['MONGO_HOST'] ?? '0.0.0.0',
    username: process.env['MONGO_USERNAME'],
    password: process.env['MONGO_PASSWORD'],
  })
);

export const mongoConfigSchema = joi.object({
  MONGO_PORT: joi.number().default(27017),
  MONGO_HOST: joi.string().hostname().default('0.0.0.0'),
  MONGO_USERNAME: joi.string().required(),
  MONGO_PASSWORD: joi.string().required(),
});
