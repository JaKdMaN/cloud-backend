import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { plainToClass } from 'class-transformer'

import { Folder } from '../folder.model'
import { FolderDto } from '../domain/dto/folder.dto'
import { CreateFolderDto } from '../domain/dto/create-folder.dto'
import { DiskEntityDto } from 'src/modules/disk-entity/domain/dto/disk-entity.dto'

import { DiskEntityService } from 'src/modules/disk-entity/services/disk-entity.service'

@Injectable()
export class FolderService {

  constructor(
    @InjectModel(Folder) private folderRepository: typeof Folder,
    @Inject(forwardRef(() => DiskEntityService)) private diskEntityService: DiskEntityService
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
    return await this.diskEntityService.createFileEntity(file, userId, parentFolderId)
  }

  async addFolder (
    createFolderDto: CreateFolderDto,
    userId: number,
    parentFolderId: number
  ): Promise<DiskEntityDto> {
    return await this.diskEntityService.createFolderEntity(createFolderDto,userId, parentFolderId)
  }

  async getContent (userId: number, parentFolderId: number): Promise<DiskEntityDto[]> {
    return await this.diskEntityService.getAll({ 
      where: { userId, parentFolderId },
      order: [ ['id', 'DESC'] ],
    })
  }

  async getParentsPath (folderId: number) {
    return await this.diskEntityService.getParentsPath(folderId)
  }
}