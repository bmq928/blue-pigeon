import { Transform, Type } from 'class-transformer'
import { isURL } from 'class-validator'
import { PaginatedResponse } from '../common/dto/paginated.dto'
import { baseConfig } from '../config'
import { User } from '../users/entities'
import { Post } from './post.entity'

const { basePath } = baseConfig()
const STATIC_SERVE_API = `${basePath}/v1/posts/statics`

export class PostResponse implements Post {
  createdById: string
  createdBy: User
  _id?: string

  @Transform(({ value }) =>
    value.map((l) =>
      isURL(l) ? l : `${STATIC_SERVE_API}?path=${encodeURIComponent(l)}`,
    ),
  )
  staticLinks: string[]

  text: string
  createdAt?: number
  updatedAt?: number
}

export class PostsPaginatedResponse extends PaginatedResponse<PostResponse> {
  @Type(() => PostResponse)
  data: PostResponse[]
}
