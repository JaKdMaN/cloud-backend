import { Injectable } from '@nestjs/common'

import { CreateFolderDto } from 'src/modules/folder/domain/dto/create-folder.dto'
import { DiskEntityDto } from 'src/modules/disk-entity/domain/dto/disk-entity.dto'
import { DiskEntityTypeEnum } from 'src/modules/disk-entity/domain/enums/disk-entity-type.enum'

import { FileService } from 'src/modules/file/services/file.service'
import { FolderService } from 'src/modules/folder/services/folder.service'
import { DiskEntityService } from 'src/modules/disk-entity/services/disk-entity.service'

@Injectable()
export class StorageService {

  constructor (
    private fileService: FileService,
    private folderService: FolderService,
    private diskEntityService: DiskEntityService
  ) {}
  
  async addFile (file: Express.Multer.File, userId: number): Promise<DiskEntityDto> {
    const { id } = await this.fileService.create(file, userId)

    return await this.diskEntityService.create({
      userId,
      type: DiskEntityTypeEnum.FILE,
      fileId: id,
    })
  }

  async addFolder (createFolderDto: CreateFolderDto, userId: number): Promise<DiskEntityDto> {
    const { id } = await this.folderService.create(createFolderDto, userId)

    return await this.diskEntityService.create({
      userId,
      type: DiskEntityTypeEnum.FOLDER,
      folderId: id,
    })
  }

  async getAll (userId: number): Promise<DiskEntityDto[]> {
    return await this.diskEntityService.getAll({ 
      where: { userId, parentFolderId: null },
      order: [ ['id', 'DESC'] ],
    })
  }
}