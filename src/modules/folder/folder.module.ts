import { Module } from '@nestjs/common'

import { FolderService } from './services/folder.service'

import { Folder } from './folder.model'

import { SequelizeModule } from '@nestjs/sequelize'
import { FolderController } from './folder.controller'
import { AuthModule } from '../auth/auth.module'
import { DiskEntityModule } from '../disk-entity/disk-entity.module'
import { FileModule } from '../file/file.module'

@Module({
  controllers: [ FolderController ],
  providers: [ FolderService ],
  imports: [
    SequelizeModule.forFeature([ Folder ]),
    AuthModule,
    FileModule,
    DiskEntityModule,
  ],
  exports: [ FolderService ],
})
export class FolderModule {}