import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { StorageEntity } from './storage-entity.model'
import { StorageService } from './services/storage.service'
import { StorageController } from './storage.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [ StorageController ],
  providers: [ StorageService ],
  imports: [
    SequelizeModule.forFeature([ StorageEntity ]),
    AuthModule,
  ],
  exports: [ StorageService ],
})
export class StorageModule {}