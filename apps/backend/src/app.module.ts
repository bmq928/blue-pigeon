import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import * as joi from 'joi'
import {
  JWT_CONFIG_TOKEN,
  JwtConfig,
  baseConfig,
  baseConfigSchema,
  jwtConfig,
  jwtConfigSchema,
  pbkdf2Config,
  pbkdf2ConfigSchema,
} from './config'
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
      load: [baseConfig, mongoConfig, jwtConfig, pbkdf2Config],
      validationSchema: joi
        .object()
        .concat(baseConfigSchema)
        .concat(mongoConfigSchema)
        .concat(jwtConfigSchema)
        .concat(pbkdf2ConfigSchema),
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
          auth: {
            username: conf.username,
            password: conf.password,
          },
        }
      },
      inject: [ConfigService],
    }),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
