import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { randomUUID } from 'node:crypto'
import { User } from '../users/entities'

export type PostDocument = Post & Document

@Schema({ timestamps: true, _id: false })
export class Post {
  // auto generated
  @Prop({ default: randomUUID })
  _id?: string

  @Prop({ type: [String], default: [] })
  imageLinks: string[]

  @Prop({ type: [String], default: [] })
  videoLinks: string[]

  @Prop({ default: '' })
  text: string

  @Prop()
  createdById: string

  // auto generated
  @Prop()
  createdAt?: number

  // auto generated
  @Prop()
  updatedAt?: number

  // populated
  createdBy: User
}

export const PostSchema = SchemaFactory.createForClass(Post)

PostSchema.virtual('createdBy', {
  ref: User.name,
  localField: '_id',
  foreignField: 'createdById',
  justOne: true,
})
