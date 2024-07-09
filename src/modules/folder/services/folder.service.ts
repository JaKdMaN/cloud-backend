import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { plainToClass, plainToInstance } from 'class-transformer'

import { Folder } from '../folder.model'
import { User } from 'src/modules/user/user.model'
import { FolderDto } from '../domain/dto/folder.dto'
import { CreateFolderDto } from '../domain/dto/create-folder.dto'
import { UpdateFolderDto } from '../domain/dto/update-folder.dto'
import { UpdateFileDto } from 'src/modules/file/domain/dto/update-file.dto'
import { AddEntitiesToFolderDto } from '../domain/dto/add-entities-to-folder.dto'

import { FileService } from 'src/modules/file/services/file.service'

@Injectable()
export class FolderService {

  constructor(
    @InjectModel(Folder) private folderRepository: typeof Folder,
    private fileService: FileService
  ) {}

  async create (ownerId: number, createFolderDto: CreateFolderDto) {
    const { name } = createFolderDto
    const { id } = await this.folderRepository.create({
      name,
      size: 0,
      createdAt: new Date(),
      lastOpenedAt: new Date(),
      ownerId,
    })
    
    return await this.getById(id)
  }

  async getById (folderId: number) {
    const folder = await this.folderRepository.findByPk(folderId, {
      include: [{ model: User, as: 'owner' }],
    })

    return plainToClass(FolderDto, folder, { excludeExtraneousValues: true })
  }

  async getFolders (ownerId: number) {
    const folders = await this.folderRepository.findAll({
      raw: true,
      where: [{ ownerId, parentFolderId: null }],
    })

    return plainToInstance(FolderDto, folders, { excludeExtraneousValues: true })
  }

  async getFoldersFromFolder (ownerId: number, parentFolderId: number) {
    const foldersFromFolder = await this.folderRepository.findAll({
      raw: true,
      where: [{ ownerId, parentFolderId }],
    })

    return plainToInstance(FolderDto, foldersFromFolder, { excludeExtraneousValues: true })
  }

  async update (folderId: number, updateFolderDto: UpdateFolderDto) {
    const folder = await this.folderRepository.findByPk(folderId)

    if (!folder) {
      throw new HttpException('Такой папки не существует', HttpStatus.BAD_REQUEST)
    }
    
    await folder.update(updateFolderDto)
      
    return await this.getById(folder.id)
  }

  async addEntities (folderId: number, addEntitiesToFolderDto: AddEntitiesToFolderDto) {
    const folder = await this.getById(folderId)

    if (!folder) {
      throw new HttpException('Такой папки не существует', HttpStatus.BAD_REQUEST)
    }

    const { fileIds, folderIds } = addEntitiesToFolderDto

    fileIds.forEach(async (id) => {
      await this.addfile(folderId, id)
    })

    folderIds.forEach(async (id) => {
      await this.addFolder(folderId, id)
    })
  }

  async addFolder (folderId: number, addedFolderId: number) {
    const addedFolder = await this.folderRepository.findByPk(addedFolderId)
    const folder = await this.folderRepository.findByPk(folderId)

    if (!addedFolder) {
      throw new HttpException('Такой папки не существует', HttpStatus.BAD_REQUEST)
    }

    if (!folder) {
      throw new HttpException('Такой папки не существует', HttpStatus.BAD_REQUEST)
    }

    await folder.update({ size: folder.size + addedFolder.size })
    await addedFolder.update({ parentFolderId: folderId })

    return await this.getById(addedFolder.id)
  }

  async addfile (folderId: number, addedFileId: number) {
    const addedFile = await this.fileService.getById(addedFileId)
    const folder = await this.folderRepository.findByPk(folderId)

    if (!addedFile) {
      throw new HttpException('Такого файла не существует', HttpStatus.BAD_REQUEST)
    }

    if (!folder) {
      throw new HttpException('Такой папки не существует', HttpStatus.BAD_REQUEST)
    }

    await folder.update({ size: folder.size + addedFile.size })
    return await this.fileService.update(addedFileId, {
      parentFolderId: folderId,
    } as UpdateFileDto)
  }

  async delete (folderId: number) {
    const folder = await this.folderRepository.findByPk(folderId)

    if (!folder) {
      throw new HttpException('Такой папки не существует', HttpStatus.BAD_REQUEST)
    }

    return await folder.destroy()
  }
}