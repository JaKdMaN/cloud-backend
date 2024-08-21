import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { plainToClass } from 'class-transformer'

import { Folder } from '../folder.model'
import { FolderDto } from '../domain/dto/folder.dto'
import { CreateFolderDto } from '../domain/dto/create-folder.dto'
import { StorageEntityTypeEnum } from 'src/modules/storage/domain/enums/storage-entity-type.enum'

import { StorageService } from 'src/modules/storage/services/storage.service'

@Injectable()
export class FolderService {

  constructor(
    @InjectModel(Folder) private folderRepository: typeof Folder,
    private storageService: StorageService
  ) {}

  async create (ownerId: number, createFolderDto: CreateFolderDto) {
    const { name } = createFolderDto

    const newFolder = await this.folderRepository.create({
      name,
      ownerId,
      size: 0,
      createdAt: new Date(),
    })

    await this.storageService.addEntity(ownerId, {
      entityId: newFolder.id,
      type: StorageEntityTypeEnum.FOLDER,
    })

    return plainToClass(FolderDto, newFolder, { excludeExtraneousValues: true })
  }
}