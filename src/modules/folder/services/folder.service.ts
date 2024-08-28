import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { plainToClass } from 'class-transformer'

import { Folder } from '../folder.model'
import { FolderDto } from '../domain/dto/folder.dto'
import { CreateFolderDto } from '../domain/dto/create-folder.dto'
import { DiskEntityDto } from 'src/modules/disk-entity/domain/dto/disk-entity.dto'
import { DiskEntityTypeEnum } from 'src/modules/disk-entity/domain/enums/disk-entity-type.enum'

import { FileService } from 'src/modules/file/services/file.service'
import { DiskEntityService } from 'src/modules/disk-entity/services/disk-entity.service'

@Injectable()
export class FolderService {

  constructor(
    @InjectModel(Folder) private folderRepository: typeof Folder,
    private diskEntityService: DiskEntityService,
    private fileService: FileService
  ) {}

  async create (createFolderDto: CreateFolderDto, ownerId: number): Promise<FolderDto> {
    const { name } = createFolderDto

    const newFolder = await this.folderRepository.create({
      name,
      ownerId,
      size: 0,
      createdAt: new Date(),
    })

    return plainToClass(FolderDto, newFolder, { excludeExtraneousValues: true })
  }

  async addFile (
    file: Express.Multer.File,
    userId: number,
    parentFolderId: number
  ): Promise<DiskEntityDto> {
    const { id } = await this.fileService.create(file, userId)

    return await this.diskEntityService.createInFolder({
      userId,
      type: DiskEntityTypeEnum.FILE,
      fileId: id,
      parentFolderId,
    })
  }

  async addFolder (
    createFolderDto: CreateFolderDto,
    userId: number,
    parentFolderId: number
  ): Promise<DiskEntityDto> {
    const { id } = await this.create(createFolderDto, userId)

    return await this.diskEntityService.createInFolder({
      userId,
      type: DiskEntityTypeEnum.FOLDER,
      folderId: id,
      parentFolderId,
    })
  }

  async getContent (userId: number, parentFolderId: number): Promise<DiskEntityDto[]> {
    return await this.diskEntityService.getAll({ 
      where: { userId, parentFolderId },
      order: [ ['id', 'DESC'] ],
    })
  }
}