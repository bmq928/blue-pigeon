import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserFriendRequestDocument = UserFriendRequest & Document

@Schema({ timestamps: true, _id: false })
export class UserFriendRequest {
  @Prop()
  fromId: string

  @Prop()
  toId: string

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const UserFriendRequestSchema =
  SchemaFactory.createForClass(UserFriendRequest)
