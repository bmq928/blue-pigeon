import { Type } from 'class-transformer'
import { PaginatedResponse } from '../common/dto/paginated.dto'
import { User } from '../users/entities'
import { Post } from './post.entity'

export class PostResponse implements Post {
  createdById: string
  createdBy: User
  _id?: string
  imageLinks: string[]
  videoLinks: string[]
  text: string
  createdAt?: number
  updatedAt?: number
}

export class PostsPaginatedResponse extends PaginatedResponse<PostResponse> {
  @Type(() => PostResponse)
  data: PostResponse[]
}
