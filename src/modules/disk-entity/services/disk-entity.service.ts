import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { FindOptions } from 'sequelize'
import { plainToClass, plainToInstance } from 'class-transformer'

import { File } from 'src/modules/file/file.model'
import { Folder } from 'src/modules/folder/folder.model'

import { FileDto } from 'src/modules/file/domain/dto/file.dto'
import { FolderDto } from 'src/modules/folder/domain/dto/folder.dto'
import { CreateFolderDto } from 'src/modules/folder/domain/dto/create-folder.dto'
import { DiskEntity } from '../disk-entity.model'
import { DiskEntityDto } from '../domain/dto/disk-entity.dto'
import { DiskEntityTypeEnum } from '../domain/enums/disk-entity-type.enum'

import { FileService } from 'src/modules/file/services/file.service'
import { FolderService } from 'src/modules/folder/services/folder.service'
import { DiskEntityShortDto } from '../domain/dto/disk-entiy-short.dto'

@Injectable()
export class DiskEntityService {
  
  constructor (
    @InjectModel(DiskEntity) private diskEntityRepository: typeof DiskEntity,
    private fileService: FileService,
    @Inject(forwardRef(() => FolderService)) private folderService: FolderService
  ) {}

  async createFileEntity (file: Express.Multer.File, userId: number, parentFolderId?: number) {
    const { id: fileId } = await this.fileService.create(file, userId)

    const { id } = await this.diskEntityRepository.create({
      userId,
      type: DiskEntityTypeEnum.FILE,
      fileId,
      parentFolderId: parentFolderId ?? null,
    })

    return await this.getById(id)
  }

  async createFolderEntity (createFolderDto: CreateFolderDto, userId, parentFolderId?: number) {
    const { id: folderId } = await this.folderService.create(createFolderDto, userId)

    const { id } = await this.diskEntityRepository.create({
      userId,
      type: DiskEntityTypeEnum.FOLDER,
      folderId,
      parentFolderId: parentFolderId ?? null,
    })

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

  async getParentsPath (diskEntityId: number): Promise<DiskEntityShortDto[]> {
    const parentsPath: DiskEntityShortDto[] = []
    let _diskEntityId = diskEntityId

    while (_diskEntityId !== null) {
      const diskEntity = await this.diskEntityRepository.findByPk(_diskEntityId, {
        include: [
          { model: File, as: 'file' },
          { model: Folder, as: 'folder' },
        ],
      })

      parentsPath.unshift({
        id: diskEntity.id,
        entityName: diskEntity.folder.name,
      })

      _diskEntityId = diskEntity.parentFolderId
    }

    return parentsPath
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