import { Transform, Type } from 'class-transformer'
import { isURL } from 'class-validator'
import { PaginatedResponse } from '../common/dto/paginated.dto'
import { baseConfig } from '../config'
import { UserResponse } from '../users/users.response'
import { Post } from './post.entity'

const { basePath } = baseConfig()
const STATIC_SERVE_API = `${basePath}/v1/posts/statics`

export class PostResponse implements Post {
  createdBy: string | UserResponse

  @Transform(({ value }) =>
    value.map((l) =>
      isURL(l) ? l : `${STATIC_SERVE_API}?path=${encodeURIComponent(l)}`,
    ),
  )
  staticLinks: string[]

  text: string
  _id?: string
  createdAt?: Date
  updatedAt?: Date
}

export class PostsPaginatedResponse extends PaginatedResponse<PostResponse> {
  @Type(() => PostResponse)
  data: PostResponse[]
}
