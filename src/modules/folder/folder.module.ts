import { Module } from '@nestjs/common'

import { FolderService } from './services/folder.service'

import { Folder } from './folder.model'

import { SequelizeModule } from '@nestjs/sequelize'
import { StorageModule } from '../storage/storage.module'
import { FolderController } from './folder.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [ FolderController ],
  providers: [ FolderService ],
  imports: [
    SequelizeModule.forFeature([ Folder ]),
    AuthModule,
    StorageModule,
  ],
  exports: [],
})
export class FolderModule {}