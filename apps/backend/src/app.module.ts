import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as joi from 'joi'
import {
  baseConfig,
  baseConfigSchema,
  jwtConfig,
  jwtConfigSchema,
} from './config'
import { mongoConfig, mongoConfigSchema } from './config/mongo.config'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [baseConfig, mongoConfig, jwtConfig],
      validationSchema: joi
        .object()
        .concat(baseConfigSchema)
        .concat(mongoConfigSchema)
        .concat(jwtConfigSchema),
    }),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
