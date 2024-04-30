import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { baseConfig } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const { host, port, basePath }: ConfigType<typeof baseConfig> = app.get(
    baseConfig.KEY,
  )

  app.setGlobalPrefix(basePath)
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(port, host)
  Logger.log(`app is running on: http://${host}:${port}${basePath}`)
}
bootstrap()
