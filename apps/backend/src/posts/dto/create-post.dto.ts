import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CreatePostDto {
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  text: string[]

  @IsArray()
  files: Express.Multer.File[]
}
