import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as SchemaTypes } from 'mongoose'
import { UserCredential } from './user-credential.entity'
import { UserProfile } from './user-profile.entity'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop({ type: UserCredential, required: true })
  credential: UserCredential

  @Prop({ type: UserProfile })
  profile?: UserProfile

  @Prop({ type: [SchemaTypes.Types.ObjectId], ref: User.name })
  friends?: User[] | string[]

  @Prop({ type: [SchemaTypes.Types.ObjectId] })
  friendRequests?: string[]

  _id?: string
  createdAt?: Date
  updatedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
