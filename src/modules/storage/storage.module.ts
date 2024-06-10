import { Module } from '@nestjs/common'

import { StorageController } from './storage.controller'
import { AuthModule } from '../auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { FileModule } from '../file/file.module'
import { FolderModule } from '../folder/folder.module'
import { StorageService } from './services/storage.service'

@Module({
  controllers: [ StorageController ],
  providers: [ StorageService ],
  imports: [
    AuthModule,
    ConfigModule,
    FileModule,
    FolderModule,
  ],
  exports: [],
})
export class StorageModule {}