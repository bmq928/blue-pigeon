import { IsNotEmpty, IsString } from 'class-validator'

export class RequestFriendDto {
  @IsString()
  @IsNotEmpty()
  friendId: string
}
