import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { RegisterDto } from './dto'
import { VerifyRegisterDto } from './dto/verify-register.dto'
import { UserAuthTokenResponse, UserRegisterResponse } from './users.response'
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

  // @Post('/profile')
  // setupProfile() {}
}
