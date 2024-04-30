import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator'
import { UserCredential } from '../entities'
import { UserProfile } from '../entities/user-profile.entity'

export class RegisterDto
  implements UserCredential, Pick<UserProfile, 'firstName' | 'lastName'>
{
  @IsEmail()
  email: string

  @IsStrongPassword()
  password: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string
}
