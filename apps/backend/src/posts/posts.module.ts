import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CryptoModule } from '../crypto/crypto.module'
import { Post, PostSchema } from './post.entity'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    CryptoModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
