import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PaginatedQueryDto } from '../common/dto/paginated.dto'
import { AuthGuard, AuthUserId } from '../common/guards/auth.guard'
import { LoginDto, RegisterDto } from './dto'
import { RequestFriendDto } from './dto/request-friend.dto'
import { SetupProfileDto } from './dto/setup-profile.dto'
import { VerifyRegisterDto } from './dto/verify-register.dto'
import {
  UserAuthTokenResponse,
  UserRegisterResponse,
  UserResponse,
  UsersPaginatedResponse,
} from './users.response'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/friends/available')
  list(
    @AuthUserId() userId: string,
    @Query() query: PaginatedQueryDto,
  ): Promise<UsersPaginatedResponse> {
    return this.usersService
      .listAvailableFriends(userId, query)
      .then((r) => plainToInstance(UsersPaginatedResponse, r))
  }

  @Post('/register')
  register(@Body() dto: RegisterDto): Promise<UserRegisterResponse> {
    return this.usersService
      .register(dto)
      .then((r) => plainToInstance(UserRegisterResponse, r))
  }

  @Post('/login')
  login(@Body() dto: LoginDto): Promise<UserAuthTokenResponse> {
    return this.usersService
      .login(dto)
      .then((r) => plainToInstance(UserAuthTokenResponse, r))
  }

  @Get('/email/verify/:key')
  verifyRegister(
    @Param() param: VerifyRegisterDto,
  ): Promise<UserAuthTokenResponse> {
    return this.usersService
      .verifyRegister(param)
      .then((r) => plainToInstance(UserAuthTokenResponse, r))
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@AuthUserId() userId: string): Promise<UserResponse> {
    return this.usersService
      .getProfile(userId)
      .then((r) => plainToInstance(UserResponse, r))
  }

  @UseGuards(AuthGuard)
  @Put('/profile')
  setupProfile(
    @AuthUserId() userId: string,
    @Body() dto: SetupProfileDto,
  ): Promise<UserResponse> {
    return this.usersService
      .setupProfile(userId, dto)
      .then((r) => plainToInstance(UserResponse, r))
  }

  @UseGuards(AuthGuard)
  @Post('/friends/requests')
  requestFriend(
    @AuthUserId() userId: string,
    @Body() dto: RequestFriendDto,
  ): Promise<UserResponse> {
    return this.usersService
      .requestFriend(userId, dto.friendId)
      .then((r) => plainToInstance(UserResponse, r))
  }

  @UseGuards(AuthGuard)
  @Get('/friends/requests')
  listFriendRequests(
    @AuthUserId() userId: string,
    @Query() query: PaginatedQueryDto,
  ): Promise<UsersPaginatedResponse> {
    return this.usersService
      .listFriendRequests(userId, query)
      .then((r) => plainToInstance(UsersPaginatedResponse, r))
  }

  @UseGuards(AuthGuard)
  @Put('/friends/accept')
  acceptFriend(
    @AuthUserId() userId: string,
    @Body() dto: RequestFriendDto,
  ): Promise<UserResponse> {
    return this.usersService
      .acceptFriend(userId, dto.friendId)
      .then((r) => plainToInstance(UserResponse, r))
  }
}
