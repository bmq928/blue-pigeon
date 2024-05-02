import { IsArray, IsString } from 'class-validator'

export class CreatePostDto {
  @IsString({ each: true })
  text: string[]

  @IsArray()
  file: Express.Multer.File[]
}
