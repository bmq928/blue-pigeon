import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { RegisterDto } from './dto'
import { SetupProfileDto } from './dto/setup-profile.dto'
import { VerifyRegisterDto } from './dto/verify-register.dto'
import { AuthGuard, AuthUserId } from './users.guard'
import {
  UserAuthTokenResponse,
  UserRegisterResponse,
  UserResponse,
} from './users.response'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  register(@Body() dto: RegisterDto): Promise<UserRegisterResponse> {
    return this.usersService
      .register(dto)
      .then((r) => plainToInstance(UserRegisterResponse, r))
  }

  @Post('/login')
  login(@Body() dto: RegisterDto): Promise<UserAuthTokenResponse> {
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
  @Put('/profile')
  setupProfile(
    @AuthUserId() userId: string,
    @Body() dto: SetupProfileDto,
  ): Promise<UserResponse> {
    return this.usersService
      .setupProfile(userId, dto)
      .then((r) => plainToInstance(UserResponse, r))
  }
}
