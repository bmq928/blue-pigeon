import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import redisStore from 'cache-manager-ioredis'
import * as joi from 'joi'
import { RedisClientOptions } from 'redis'
import {
  CACHE_CONFIG_TOKEN,
  CacheConfig,
  JWT_CONFIG_TOKEN,
  JwtConfig,
  baseConfig,
  baseConfigSchema,
  cacheConfig,
  cacheConfigSchema,
  jwtConfig,
  jwtConfigSchema,
  pbkdf2Config,
  pbkdf2ConfigSchema,
  staticConfig,
  staticConfigSchema,
} from './config'
import { mailerConfig, mailerConfigSchema } from './config/mailer.config'
import {
  MONGO_CONFIG_TOKEN,
  MongoConfig,
  mongoConfig,
  mongoConfigSchema,
} from './config/mongo.config'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        baseConfig,
        mongoConfig,
        jwtConfig,
        pbkdf2Config,
        cacheConfig,
        mailerConfig,
        staticConfig,
      ],
      validationSchema: joi
        .object()
        .concat(baseConfigSchema)
        .concat(mongoConfigSchema)
        .concat(jwtConfigSchema)
        .concat(pbkdf2ConfigSchema)
        .concat(cacheConfigSchema)
        .concat(mailerConfigSchema)
        .concat(staticConfigSchema),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const conf = configService.get<JwtConfig>(JWT_CONFIG_TOKEN)
        return {
          secret: conf.secret,
          expiresIn: conf.accessTokenExpire,
        }
      },
      inject: [ConfigService],
      global: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const conf = configService.get<MongoConfig>(MONGO_CONFIG_TOKEN)
        return {
          uri: `mongodb://${conf.host}:${conf.port}`,
          dbName: conf.database,
          replicaSet: conf.replicaSet,
          auth: {
            username: conf.username,
            password: conf.password,
          },
        }
      },
      inject: [ConfigService],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      useFactory: (configService: ConfigService) => {
        const conf = configService.get<CacheConfig>(CACHE_CONFIG_TOKEN)

        return {
          store: redisStore,
          host: conf.redis.host,
          port: conf.redis.port,
        }
      },
      inject: [ConfigService],
      isGlobal: true,
    }),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
