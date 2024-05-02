import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  StreamableFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { plainToInstance } from 'class-transformer'
import { PaginatedQueryDto } from '../common/dto/paginated.dto'
import { AuthGuard, AuthUserId } from '../common/guards/auth.guard'
import { CreatePostDto } from './dto/create-post.dto'
import { ServeStaticDto } from './dto/serve-static.dto'
import { PostResponse, PostsPaginatedResponse } from './posts.response'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  list(
    @AuthUserId() userId: string,
    @Query() query: PaginatedQueryDto,
  ): Promise<PostsPaginatedResponse> {
    return this.postsService
      .list(userId, query)
      .then((r) => plainToInstance(PostsPaginatedResponse, r))
  }

  @UseGuards(AuthGuard)
  @Post('/')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
  post(
    @AuthUserId() userId: string,
    @UploadedFiles() { files }: Pick<CreatePostDto, 'files'>,
    @Body() body: Omit<CreatePostDto, 'files'>,
  ): Promise<PostResponse> {
    return this.postsService
      .post(userId, { ...body, files })
      .then((r) => plainToInstance(PostResponse, r))
  }

  @Get('/statics')
  serveStatic(@Query() dto: ServeStaticDto): Promise<StreamableFile> {
    return this.postsService.serveStatic(dto)
  }
}
