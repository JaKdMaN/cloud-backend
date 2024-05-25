import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'

async function start() {
  const PORT = process.env.PORT || 7000

  const app = await NestFactory.create(AppModule, { cors: true })

  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(PORT, () => console.log('server started on port ' + PORT))
}
start()
