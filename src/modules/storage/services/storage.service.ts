import { Injectable } from '@nestjs/common'

import { CreateFolderDto } from 'src/modules/folder/domain/dto/create-folder.dto'
import { DiskEntityDto } from 'src/modules/disk-entity/domain/dto/disk-entity.dto'

import { DiskEntityService } from 'src/modules/disk-entity/services/disk-entity.service'

@Injectable()
export class StorageService {

  constructor (
    private diskEntityService: DiskEntityService
  ) {}
  
  async addFile (file: Express.Multer.File, userId: number): Promise<DiskEntityDto> {
    return await this.diskEntityService.createFileEntity(file, userId)
  }

  async addFolder (createFolderDto: CreateFolderDto, userId: number): Promise<DiskEntityDto> {
    return await this.diskEntityService.createFolderEntity(createFolderDto, userId)
  }

  async getAll (userId: number): Promise<DiskEntityDto[]> {
    return await this.diskEntityService.getAll({ 
      where: { userId, parentFolderId: null },
      order: [ ['id', 'DESC'] ],
    })
  }
}