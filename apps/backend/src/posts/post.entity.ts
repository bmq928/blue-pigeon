import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as SchemaTypes } from 'mongoose'
import { User } from '../users/entities'

export type PostDocument = Post & Document

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: [String], default: [] })
  staticLinks: string[]

  @Prop({ default: '' })
  text: string

  @Prop({ ref: User.name, type: SchemaTypes.Types.ObjectId })
  createdBy: User | string

  // auto generated
  _id?: string
  createdAt?: Date
  updatedAt?: Date
}

export const PostSchema = SchemaFactory.createForClass(Post)
