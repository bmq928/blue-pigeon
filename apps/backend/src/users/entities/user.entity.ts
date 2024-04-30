import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { randomUUID } from 'node:crypto'
import { UserCredential } from './user-credential.entity'
import { UserProfile } from './user-profile.entity'

export type UserDocument = User & Document

@Schema({ timestamps: true, _id: false })
export class User {
  @Prop({ type: UserCredential })
  credential: UserCredential

  @Prop({ type: UserProfile, default: null })
  profile: UserProfile

  @Prop({ default: randomUUID })
  _id?: string

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
