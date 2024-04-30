import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserProfileDocument = UserProfile & Document

@Schema({ _id: false, timestamps: true })
export class UserProfile {
  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile)
