import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { DiskEntity } from './disk-entity.model'
import { DiskEntityService } from './services/disk-entity.service'

@Module({
  controllers: [],
  providers: [ DiskEntityService ],
  imports: [
    SequelizeModule.forFeature([ DiskEntity ]),

  ],
  exports: [ DiskEntityService ],
})
export class DiskEntityModule {}