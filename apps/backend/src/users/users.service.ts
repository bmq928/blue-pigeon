import { CACHE_MANAGER } from '@nestjs/cache-manager'
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
import { Cache } from 'cache-manager'
import type { Model } from 'mongoose'
import * as crypto from 'node:crypto'
import { cacheConfig, pbkdf2Config } from '../config'
import { MailerService } from '../mailer/mailer.service'
import { LoginDto, RegisterDto } from './dto'
import { VerifyRegisterDto } from './dto/verify-register.dto'
import { User, UserDocument } from './entities'
import { UserAuthTokenResponse, UserRegisterResponse } from './users.response'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(pbkdf2Config.KEY)
    private readonly pbkdf2Env: ConfigType<typeof pbkdf2Config>,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManger: Cache,
    @Inject(cacheConfig.KEY)
    private readonly cacheConf: ConfigType<typeof cacheConfig>,
    private readonly mailerService: MailerService,
  ) {}

  async register(dto: RegisterDto): Promise<UserRegisterResponse> {
    const existed = await this.userModel
      .findOne({
        'credential.email': dto.email,
      })
      .lean()

    if (existed)
      throw new BadRequestException([`email ${dto.email} is existed`])

    const randomKey = crypto.randomUUID()
    await this.cacheManger.set(
      `${this.cacheConf.register}-${randomKey}`,
      JSON.stringify(dto),
      this.cacheConf.register.ttl,
    )
    await this.mailerService.send({
      to: dto.email,
      subject: 'Verify register',
      text: `Enter this key to verify email: ${randomKey}`,
    })
    return { message: 'please verify email' }
  }

  async login(dto: LoginDto): Promise<UserAuthTokenResponse> {
    const existed = await this.userModel
      .findOne({
        'credential.email': dto.email,
        'credential.password': await this.hash(dto.password),
      })
      .lean()

    if (!existed) throw new NotFoundException([`email or password is wrong`])

    return {
      accessToken: this.jwtService.sign({
        _id: existed._id,
        email: existed.credential.email,
      }),
    }
  }

  async verifyRegister(dto: VerifyRegisterDto): Promise<UserAuthTokenResponse> {
    const cacheKey = `${this.cacheConf.register}-${dto.key}`
    const registerDtoRaw: string = await this.cacheManger.get(cacheKey)
    await this.cacheManger.del(cacheKey)
    if (!registerDtoRaw) throw new NotFoundException(['key is not existed'])

    const registerDto: RegisterDto = JSON.parse(registerDtoRaw)
    const created = await new this.userModel({
      credential: {
        email: registerDto.email,
        password: await this.hash(registerDto.password),
      },
      profile: {
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
      },
    }).save()

    return {
      accessToken: this.jwtService.sign({
        _id: created._id,
        email: created.credential.email,
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
