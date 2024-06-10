import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { CreateFolderDto } from './domain/dto/create-folder.dto'
import { UpdateFolderDto } from './domain/dto/update-folder.dto'
import { AddEntitiesToFolderDto } from './domain/dto/add-entities-to-folder.dto'

import { AuthAccessGuard } from '../auth/guards/auth-access.guard'
import { FolderService } from './services/folder.service'
import { TokenService } from '../auth/services/token.service'

@Controller('folders')
export class FolderController {

  constructor(
    private folderService: FolderService,
    private tokenService: TokenService
  ) {}

  @UseGuards(AuthAccessGuard)
  @Post('create')
  createFolder (@Body() createFolderDto: CreateFolderDto, @Req() req: Request) {
    const accessToken = req.headers.authorization.split(' ')[1]
    const { sub: ownerId } = this.tokenService.decodeToken(accessToken)

    return this.folderService.create(ownerId, createFolderDto)
  }

  @UseGuards(AuthAccessGuard)
  @Put(':folderId')
  updateFolder (@Param('folderId') folderId: number, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.update(folderId, updateFolderDto)
  }

  @UseGuards(AuthAccessGuard)
  @Put(':folderId/add-entities')
  addEntities (@Param() folderId: number, @Body() addEntitiesToFolderDto: AddEntitiesToFolderDto) {
    return this.folderService.addEntities(folderId, addEntitiesToFolderDto)
  }

  @UseGuards(AuthAccessGuard)
  @Delete(':folderId')
  deleteFolder (@Param('folderId') folderId: number) {
    return this.folderService.delete(folderId)
  }
}