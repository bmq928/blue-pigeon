import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import { PaginatedQueryDto, SortEnum } from '../common/dto/paginated.dto'
import { UserResponse } from '../users/users.response'
import { CreatePostDto } from './dto/create-post.dto'
import { Post, PostDocument } from './post.entity'
import { PostsPaginatedResponse } from './posts.response'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async list(
    userId: string,
    query: PaginatedQueryDto,
  ): Promise<PostsPaginatedResponse> {
    const [resp] = await this.postModel
      .aggregate()
      .facet({
        data: [
          { $match: { createdById: userId } },
          { $sort: { [query.sortBy]: query.sort === SortEnum.ASC ? 1 : -1 } },
          { $skip: query.page * query.perPage },
          { $limit: query.perPage },
        ],
        total: [{ $match: { createdById: userId } }, { $count: 'count' }],
      })
      .exec()
    return {
      data: resp.data,
      pageInfo: { ...query, total: resp[0]?.count ?? 0 },
    }
  }

  async post(userId: string, dto: CreatePostDto): Promise<UserResponse> {
    console.log({ userId, dto })
    return null
  }
}
