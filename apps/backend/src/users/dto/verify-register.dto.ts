import { IsUUID } from 'class-validator'

export class VerifyRegisterDto {
  @IsUUID()
  key: string
}
