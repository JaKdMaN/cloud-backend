import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { FileModule } from './file/file.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    UserModule,
    FileModule,
  ],
})
export class AppModule {}