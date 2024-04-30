import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserProfileDocument = UserProfile & Document

@Schema({ _id: false, timestamps: true })
export class UserProfile {
  // auto generated
  @Prop()
  createdAt?: number

  // auto generated
  @Prop()
  updatedAt?: number
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile)
