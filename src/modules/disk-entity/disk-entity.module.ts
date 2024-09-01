import { forwardRef, Module } from '@nestjs/common'

import { DiskEntity } from './disk-entity.model'

import { DiskEntityService } from './services/disk-entity.service'

import { SequelizeModule } from '@nestjs/sequelize'
import { FileModule } from '../file/file.module'
import { FolderModule } from '../folder/folder.module'

@Module({
  controllers: [],
  providers: [ DiskEntityService ],
  imports: [
    SequelizeModule.forFeature([ DiskEntity ]),
    FileModule,
    forwardRef(() => FolderModule),
  ],
  exports: [ DiskEntityService ],
})
export class DiskEntityModule {}