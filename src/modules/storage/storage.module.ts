import { Module } from '@nestjs/common'
import { StorageController } from './storage.controller'
import { StorageService } from './services/storage.service'
import { AuthModule } from '../auth/auth.module'
import { DiskEntityModule } from '../disk-entity/disk-entity.module'
import { FileModule } from '../file/file.module'
import { FolderModule } from '../folder/folder.module'

@Module({
  controllers: [ StorageController ],
  providers: [ StorageService ],
  imports: [
    AuthModule,
    FileModule,
    FolderModule,
    DiskEntityModule,
  ],
  exports: [],
})
export class StorageModule {}