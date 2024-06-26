import { IsNotEmpty, IsString } from 'class-validator'

export class VerifyRegisterDto {
  @IsString()
  @IsNotEmpty()
  key: string
}
