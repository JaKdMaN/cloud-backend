import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import { StorageEntityDto } from '../domain/dto/storage-entity.dto'

import { FileService } from 'src/modules/file/services/file.service'
import { FolderService } from 'src/modules/folder/services/folder.service'

@Injectable()
export class StorageService {

  constructor(
    private fileService: FileService,
    private folderService: FolderService
  ) {}

  async getStorage (ownerId: number) {
    const files = await this.fileService.getFiles(ownerId) 
    const folders = await this.folderService.getFolders(ownerId)

    const entities = plainToInstance(StorageEntityDto, [
      ...files.map(file => ({ type: 'file', entity: file })),
      ...folders.map(folder => ({ type: 'folder', entity: folder })),
    ])

    entities.sort((a, b) => new Date(b.entity.createdAt).getTime() - new Date(a.entity.createdAt).getTime())

    return entities
  }

  async getFolderStorage (ownerId: number, folderId: number) {
    const files = await this.fileService.getFilesFromFolder(ownerId, folderId)
    const folders = await this.folderService.getFoldersFromFolder(ownerId, folderId)

    const entities = plainToInstance(StorageEntityDto, [
      ...files.map(file => ({ type: 'file', entity: file })),
      ...folders.map(folder => ({ type: 'folder', entity: folder })),
    ])

    entities.sort((a, b) => new Date(a.entity.createdAt).getTime() - new Date(b.entity.createdAt).getTime())

    return entities
  }
}