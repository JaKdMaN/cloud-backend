import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { FileModule } from '../file/file.module'

import { Folder } from './folder.model'

import { FolderController } from './folder.controller'
import { AuthModule } from '../auth/auth.module'
import { FolderService } from './services/folder.service'

@Module({
  controllers: [ FolderController ],
  providers: [ FolderService ],
  imports: [
    SequelizeModule.forFeature([ Folder ]),
    ConfigModule,
    AuthModule,
    FileModule,
  ],
  exports: [ FolderService ],
})
export class FolderModule {}
