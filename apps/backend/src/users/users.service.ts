import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import * as crypto from 'node:crypto'
import { pbkdf2Config } from '../config'
import { LoginDto, RegisterDto } from './dto'
import { User, UserDocument } from './entities'
import { UserAuthTokenResponse } from './users.response'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(pbkdf2Config.KEY)
    private readonly pbkdf2Env: ConfigType<typeof pbkdf2Config>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<UserAuthTokenResponse> {
    const existed = await this.userModel
      .findOne({
        'credential.email': dto.email,
      })
      .lean()

    if (existed)
      throw new BadRequestException([`email ${dto.email} is existed`])
    const model = new this.userModel({
      credential: { email: dto.email, password: await this.hash(dto.password) },
    })
    const created = await model.save()

    return {
      accessToken: this.jwtService.sign({
        _id: created._id,
        email: dto.email,
      }),
    }
  }

  async login(dto: LoginDto): Promise<UserAuthTokenResponse> {
    const existed = await this.userModel
      .findOne({
        'credential.email': dto.email,
        'credential.password': await this.hash(dto.password),
      })
      .lean()

    if (!existed) throw new NotFoundException([`email or password is wrong`])

    const created = await new this.userModel({
      credential: { email: dto.email, password: await this.hash(dto.password) },
    }).save()

    return {
      accessToken: this.jwtService.sign({
        _id: created._id,
        email: dto.email,
      }),
    }
  }

  private hash(raw: string): Promise<string> {
    return new Promise((resolve, reject) =>
      crypto.pbkdf2(
        raw,
        this.pbkdf2Env.pbkdf2Salt,
        this.pbkdf2Env.pbkdf2Iterations,
        this.pbkdf2Env.pbkdf2KeyLens,
        this.pbkdf2Env.pbkdf2Digest,
        (err: Error | null, buf: Buffer) =>
          err
            ? reject(new InternalServerErrorException(err))
            : resolve(buf.toString('hex')),
      ),
    )
  }
}
