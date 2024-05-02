import { IsArray, IsString } from 'class-validator'

export class CreatePostDto {
  @IsString({ each: true })
  text: string[]

  @IsArray()
  files: Express.Multer.File[]
}
