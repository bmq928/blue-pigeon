import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CryptoModule } from '../crypto/crypto.module'
import { MailerModule } from '../mailer/mailer.module'
import { User, UserSchema } from './entities'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailerModule,
    CryptoModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
