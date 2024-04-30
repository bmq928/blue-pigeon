import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { randomUUID } from 'node:crypto'

export type UserCredentialDocument = UserCredential & Document

@Schema({ _id: false, timestamps: true })
export class UserCredential {
  @Prop()
  username: string

  @Prop()
  password: string

  // auto generated
  @Prop({ default: randomUUID })
  _id?: string

  // auto generated
  @Prop()
  createdAt?: number

  // auto generated
  @Prop()
  updatedAt?: number
}

export const UserCredentialSchema = SchemaFactory.createForClass(UserCredential)
