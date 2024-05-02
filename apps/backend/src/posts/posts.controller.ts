import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { plainToInstance } from 'class-transformer'
import { PaginatedQueryDto } from '../common/dto/paginated.dto'
import { AuthGuard, AuthUserId } from '../common/guards/auth.guard'
import { CreatePostDto } from './dto/create-post.dto'
import { PostResponse, PostsPaginatedResponse } from './posts.response'
import { PostsService } from './posts.service'

@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  list(
    @AuthUserId() userId: string,
    @Query() query: PaginatedQueryDto,
  ): Promise<PostsPaginatedResponse> {
    return this.postsService
      .list(userId, query)
      .then((r) => plainToInstance(PostsPaginatedResponse, r))
  }

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'files', maxCount: 10 },
      { name: 'text', maxCount: 1 },
    ]),
  )
  post(
    @AuthUserId() userId: string,
    @UploadedFiles() dto: CreatePostDto,
  ): Promise<PostResponse> {
    return this.postsService
      .post(userId, dto)
      .then((r) => plainToInstance(PostResponse, r))
  }
}
