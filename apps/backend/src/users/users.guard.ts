import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

const AUTH_USER = '__AUTH_USER__'

export type AuthUserType = { _id: string }

export const AuthUserId = createParamDecorator(
  (data: string, ctx: ExecutionContext): AuthUserType =>
    ctx.switchToHttp().getRequest()[AUTH_USER]._id,
)

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest()
      const [authType, token] = req.headers['authorization']?.split(' ') ?? []

      if (authType !== 'Bearer' || !token)
        throw new UnauthorizedException(['Unauthorized'])

      const { _id }: AuthUserType = await this.jwtService.verifyAsync(token)
      req[AUTH_USER] = { _id }
      return true
    } catch (err) {
      throw new UnauthorizedException(['Unauthorized'])
    }
  }
}
