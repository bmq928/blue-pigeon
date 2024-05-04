import { Module } from '@nestjs/common'
import { CrytpoService } from './crypto.service'

@Module({
  providers: [CrytpoService],
  exports: [CrytpoService],
})
export class CryptoModule {}
