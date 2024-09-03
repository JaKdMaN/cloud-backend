import { forwardRef, Module } from '@nestjs/common'

import { Folder } from './folder.model'

import { FolderController } from './folder.controller'
import { FolderService } from './services/folder.service'

import { AuthModule } from '../auth/auth.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { DiskEntityModule } from '../disk-entity/disk-entity.module'

@Module({
  controllers: [ FolderController ],
  providers: [ FolderService ],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([ Folder ]),
    forwardRef(() => DiskEntityModule),
  ],
  exports: [ FolderService ],
})
export class FolderModule {}