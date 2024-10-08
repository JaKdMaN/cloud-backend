import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { File } from './file.model'

import { FileController } from './file.controller'
import { FileService } from './services/file.service'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [ FileController ],
  providers: [ FileService ],
  imports: [
    SequelizeModule.forFeature([ File ]),
    AuthModule,
  ],
  exports: [ FileService ],
})
export class FileModule {}
