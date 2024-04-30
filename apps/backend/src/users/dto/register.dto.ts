import { IsEmail, IsStrongPassword } from 'class-validator'
import { UserCredential } from '../entities'

export class RegisterDto implements UserCredential {
  @IsEmail()
  email: string

  @IsStrongPassword()
  password: string
}
