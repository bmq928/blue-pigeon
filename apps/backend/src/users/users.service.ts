import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Cache } from 'cache-manager'
import { isNotEmpty } from 'class-validator'
import { Types, type Model } from 'mongoose'
import { PaginatedQueryDto, SortEnum } from '../common/dto/paginated.dto'
import { cacheConfig } from '../config'
import { CrytpoService } from '../crypto/crypto.service'
import { MailerService } from '../mailer/mailer.service'
import { LoginDto, RegisterDto } from './dto'
import { SetupProfileDto } from './dto/setup-profile.dto'
import { VerifyRegisterDto } from './dto/verify-register.dto'
import { User, UserDocument } from './entities'
import {
  UserAuthTokenResponse,
  UserRegisterResponse,
  UserResponse,
  UsersPaginatedResponse,
} from './users.response'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly cryptoService: CrytpoService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManger: Cache,
    @Inject(cacheConfig.KEY)
    private readonly cacheConf: ConfigType<typeof cacheConfig>,
    private readonly mailerService: MailerService,
  ) {}

  async listAvailableFriends(
    userId: string,
    query: PaginatedQueryDto,
  ): Promise<UsersPaginatedResponse> {
    const me = await this.userModel.findById(userId)
    const [resp] = await this.userModel
      .aggregate()
      .facet({
        data: [
          {
            $match: {
              _id: { $nin: [me._id, ...me.friends, ...me.friendRequests] },
            },
          },
          { $sort: { [query.sortBy]: query.sort === SortEnum.ASC ? 1 : -1 } },
          { $skip: (query.page - 1) * query.perPage },
          { $limit: query.perPage },
        ],
        total: [
          {
            $match: {
              $and: [{ _id: { $ne: new Types.ObjectId(userId) } }],
            },
          },
          { $count: 'count' },
        ],
      })
      .exec()

    return {
      data: resp.data,
      pageInfo: { ...query, total: resp.total?.[0]?.count ?? 0 },
    }
  }

  async register(dto: RegisterDto): Promise<UserRegisterResponse> {
    const existed = await this.userModel
      .findOne({
        'credential.email': dto.email,
      })
      .lean()

    if (existed)
      throw new BadRequestException([`email ${dto.email} is existed`])

    const randomKey = this.cryptoService.random()
    const cacheKey = `${this.cacheConf.register.prefix}-${randomKey}`
    await this.cacheManger.set(
      cacheKey,
      JSON.stringify({
        ...dto,
        password: await this.cryptoService.hash(dto.password),
      }),
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
        'credential.password': await this.cryptoService.hash(dto.password),
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
    const cacheKey = `${this.cacheConf.register.prefix}-${dto.key}`
    const registerDtoRaw = await this.cacheManger.get<string>(cacheKey)
    await this.cacheManger.del(cacheKey)
    if (!registerDtoRaw) throw new NotFoundException(['key is not existed'])

    const registerDto: RegisterDto = JSON.parse(registerDtoRaw)
    const created = await new this.userModel({
      credential: {
        email: registerDto.email,
        password: registerDto.password,
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

  async getProfile(userId: string): Promise<UserResponse> {
    const founded = await this.userModel.findById(userId)
    return founded.toObject()
  }

  async setupProfile(
    userId: string,
    dto: SetupProfileDto,
  ): Promise<UserResponse> {
    const updateProfileQuery = Object.entries(dto)
      .filter(([, val]) => isNotEmpty(val))
      .reduce(
        (acc, [key, val]) => ({
          ...acc,
          [`profile.${key}`]: val,
        }),
        {},
      )

    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $set: updateProfileQuery,
        },
        { returnDocument: 'after' },
      )
      .lean()
  }

  async requestFriend(userId: string, friendId: string): Promise<UserResponse> {
    if (userId === friendId)
      throw new BadRequestException(['cannot request friend to yourself'])

    const updated = await this.userModel.findByIdAndUpdate(
      friendId,
      {
        $addToSet: { friendRequests: userId },
      },
      { returnDocument: 'after' },
    )

    if (!updated) throw new NotFoundException(['friendId is not found'])
    return updated.toObject()
  }

  async acceptFriend(userId: string, friendId: string): Promise<UserResponse> {
    const user = await this.userModel.findById(userId)

    if (!user.friendRequests.includes(friendId))
      throw new BadRequestException(['not have friend request'])

    const session = await this.userModel.startSession()
    const [updated] = await session.withTransaction(() =>
      Promise.all([
        this.userModel
          .findByIdAndUpdate(
            userId,
            {
              $addToSet: {
                friends: friendId,
              },
              $pull: {
                friendRequests: friendId,
              },
            },
            { session, returnDocument: 'after' },
          )
          .lean(),
        this.userModel
          .findByIdAndUpdate(
            friendId,
            { $addToSet: { friends: userId } },
            { session },
          )
          .lean(),
      ]),
    )
    await session.endSession()

    return updated as UserResponse
  }
}
