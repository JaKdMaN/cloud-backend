import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { FolderModule } from './folder/folder.module'
import { FileModule } from './file/file.module'
import { StorageModule } from './storage/storage.module'
import { DiskEntityModule } from './disk-entity/disk-entity.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    DiskEntityModule,
    FolderModule,
    FileModule,
    StorageModule,
  ],
})
export class AppModule {}