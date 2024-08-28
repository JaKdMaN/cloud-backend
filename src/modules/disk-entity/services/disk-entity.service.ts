import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { FindOptions } from 'sequelize'
import { plainToClass, plainToInstance } from 'class-transformer'

import { File } from 'src/modules/file/file.model'
import { Folder } from 'src/modules/folder/folder.model'
import { FileDto } from 'src/modules/file/domain/dto/file.dto'
import { FolderDto } from 'src/modules/folder/domain/dto/folder.dto'
import { DiskEntity } from '../disk-entity.model'
import { DiskEntityDto } from '../domain/dto/disk-entity.dto'
import { DiskEntityTypeEnum } from '../domain/enums/disk-entity-type.enum'
import { CreateDiskEntityDto } from '../domain/dto/create-disk-entity.dto'
import { CreateDiskEntityInFolderDto } from '../domain/dto/create-disk-entity-in-folder.dto'

@Injectable()
export class DiskEntityService {
  
  constructor (
    @InjectModel(DiskEntity) private diskEntityRepository: typeof DiskEntity
  ) {}

  async create (createDiskEntityDto: CreateDiskEntityDto): Promise<DiskEntityDto> {
    const { id } = await this.diskEntityRepository.create(createDiskEntityDto)

    return await this.getById(id)
  }

  async createInFolder (createDiskEntityInFolderDto: CreateDiskEntityInFolderDto) {
    const { id } = await this.diskEntityRepository.create(createDiskEntityInFolderDto)

    return await this.getById(id)
  }

  async getById (diskEntityId: number): Promise<DiskEntityDto> {
    const diskEntity = await this.diskEntityRepository.findByPk(diskEntityId, {
      include: [
        { model: File, as: 'file' },
        { model: Folder, as: 'folder' },
      ],
    })

    return this.convertToDto(diskEntity)
  }

  async getAll(findParams?: FindOptions<DiskEntity>): Promise<DiskEntityDto[]> {
    const diskEntities = await this.diskEntityRepository.findAll({
      ...findParams,
      include: [
        { model: File, as: 'file' },
        { model: Folder, as: 'folder' },
      ],
    })

    return plainToInstance(DiskEntityDto, diskEntities.map(diskEntity => {
      return this.convertToDto(diskEntity)
    }))
  }

  private convertToDto (diskEntity: DiskEntity): DiskEntityDto {
    const { id, type, file, folder } = diskEntity
    const convertedEntity = type === DiskEntityTypeEnum.FILE ?
      plainToClass(FileDto, file, { excludeExtraneousValues: true }) :
      plainToClass(FolderDto, folder, { excludeExtraneousValues: true })

    return {
      id,
      type,
      entity: convertedEntity,
    }
  }
}