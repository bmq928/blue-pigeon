import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserCredentialDocument = UserCredential & Document

@Schema({ _id: false, timestamps: true })
export class UserCredential {
  @Prop()
  email: string

  @Prop()
  password: string

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const UserCredentialSchema = SchemaFactory.createForClass(UserCredential)
