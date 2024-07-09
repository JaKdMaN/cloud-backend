import { Module } from '@nestjs/common'

import { StorageController } from './storage.controller'
import { AuthModule } from '../auth/auth.module'
import { FileModule } from '../file/file.module'
import { FolderModule } from '../folder/folder.module'
import { StorageService } from './services/storage.service'

@Module({
  controllers: [ StorageController ],
  providers: [ StorageService ],
  imports: [
    AuthModule,
    FileModule,
    FolderModule,
  ],
  exports: [],
})
export class StorageModule {}