import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserCredentialDocument = UserCredential & Document

@Schema({ _id: false, timestamps: true })
export class UserCredential {
  @Prop({ unique: true })
  email: string

  @Prop()
  password: string
}

export const UserCredentialSchema = SchemaFactory.createForClass(UserCredential)
