import { IsString, IsStrongPassword } from 'class-validator'
import { UserCredential } from '../entities'

export class RegisterDto implements UserCredential {
  @IsString()
  username: string

  @IsStrongPassword()
  password: string
}
