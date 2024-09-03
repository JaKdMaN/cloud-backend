import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'

async function start() {
  const PORT = process.env.PORT || 7000

  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.use(cookieParser())

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(PORT)
}
start()
