import {
  Inject,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { PaginatedQueryDto, SortEnum } from '../common/dto/paginated.dto'
import { staticConfig } from '../config'
import { UserResponse } from '../users/users.response'
import { CreatePostDto } from './dto/create-post.dto'
import { ServeStaticDto } from './dto/serve-static.dto'
import { Post, PostDocument } from './post.entity'
import { MIME_TYPES_MAP } from './posts.constants'
import { PostsPaginatedResponse } from './posts.response'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @Inject(staticConfig.KEY)
    private readonly staticConf: ConfigType<typeof staticConfig>,
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
    const folder = path.join(this.staticConf.rootPath, 'posts', userId)
    const random = crypto.randomBytes(3).toString('hex')
    const toFilePath = (f: Express.Multer.File) =>
      path.join(folder, `${random}-${f.originalname}`)

    await fs.promises.mkdir(folder, { recursive: true })
    await Promise.all(
      dto.files.map((f) => fs.promises.writeFile(toFilePath(f), f.buffer)),
    )
    const created = await new this.postModel({
      text: dto.text,
      staticLinks: dto.files.map(toFilePath),
    }).save()

    return created.toObject()
  }

  async serveStatic(dto: ServeStaticDto): Promise<StreamableFile> {
    const fileExist = await fs.promises
      .access(dto.path, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)
    if (!fileExist) throw new NotFoundException(['path is not found'])

    const name = path.basename(dto.path)
    const ext = path.extname(name).slice(1)
    const mimeType = Object.keys(MIME_TYPES_MAP).find((key) =>
      MIME_TYPES_MAP[key].extensions.includes(ext),
    )

    return new StreamableFile(fs.createReadStream(dto.path), {
      disposition: `attachment; filename="${name}"`,
      type: mimeType,
    })
  }
}
