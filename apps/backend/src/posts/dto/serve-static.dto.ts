import { IsNotEmpty, IsString } from 'class-validator'

export class ServeStaticDto {
  @IsString()
  @IsNotEmpty()
  path: string
}
