import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { randomUUID } from 'node:crypto'

export type UserDocument = User & Document

@Schema({ timestamps: true, _id: false })
export class User {
  // auto generated
  @Prop({ default: randomUUID })
  _id?: string

  @Prop({ type: [String], default: [] })
  imageLinks: string[]

  @Prop({ type: [String], default: [] })
  videoLinks: string[]

  @Prop({ default: '' })
  text: string

  // auto generated
  @Prop()
  createdAt?: number

  // auto generated
  @Prop()
  updatedAt?: number
}

export const UserSchema = SchemaFactory.createForClass(User)
