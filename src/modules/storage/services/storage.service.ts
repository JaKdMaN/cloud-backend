import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { plainToClass, plainToInstance } from 'class-transformer'

import { StorageEntity } from '../storage-entity.model'
import { File } from 'src/modules/file/file.model'
import { Folder } from 'src/modules/folder/folder.model'
import { AddStorageEntityDto } from '../domain/dto/add-storage-entity.dto'
import { StorageEntityTypeEnum } from '../domain/enums/storage-entity-type.enum'
import { StorageEntityDto } from '../domain/dto/storage-entity.dto'
import { FileDto } from 'src/modules/file/domain/dto/file.dto'
import { FolderDto } from 'src/modules/folder/domain/dto/folder.dto'

@Injectable()
export class StorageService {

  constructor(@InjectModel(StorageEntity) private storageEntityRepository: typeof StorageEntity) {}

  async addEntity (userId:number, addStorageEntityDto: AddStorageEntityDto) {
    const { entityId, type, parentFolderId } = addStorageEntityDto

    const entityIdType = type === StorageEntityTypeEnum.FILE ? 'fileId' : 'folderId'

    const entity = await this.storageEntityRepository.create({
      userId,
      type,
      parentFolderId,
      [entityIdType]: entityId,
    })

    return plainToClass(StorageEntityDto, entity, { excludeExtraneousValues: true })
  }

  async getStorage (userId: number) {
    const storageEntities = await this.storageEntityRepository.findAll({
      where: { userId, parentFolderId: null },
      order: [[ 'id', 'DESC' ]],
      include: [
        { model: Folder, as: 'folder' },
        { model: File, as: 'file' },
      ],
    })

    return plainToInstance(StorageEntityDto, [
      ...storageEntities.map(entity => this.formatStorageEntity(entity)),
    ])
  }

  formatStorageEntity (storageEntity: StorageEntity): StorageEntityDto {
    const { id, type, file, folder } = storageEntity

    const formatedEntity = type === StorageEntityTypeEnum.FILE ?
      plainToClass(FileDto, file, { excludeExtraneousValues: true }) :
      plainToClass(FolderDto, folder, { excludeExtraneousValues: true })

    return {
      id,
      type,
      entity: formatedEntity,
    }
  }
}