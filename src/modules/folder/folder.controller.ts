import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { UploadFileInterceptor } from 'src/interceptors/upload-file.interceptor'
import { User } from 'src/decorators/user.decorator'

import { JwtVerifiedUserType } from '../auth/domain/types/jwt-verified-user.type'
import { CreateFolderDto } from './domain/dto/create-folder.dto'

import { AuthAccessGuard } from '../auth/guards/auth-access.guard'
import { FolderService } from './services/folder.service'

@Controller('folders')
export class FolderController {

  constructor(private folderService: FolderService) {}

  @UseGuards(AuthAccessGuard)
  @Post(':parentFolderId/add-file')
  @UseInterceptors(UploadFileInterceptor)
  addFile (
    @UploadedFile('file') file: Express.Multer.File,
    @Param('parentFolderId') parentFolderId: number,
    @User() { sub: userId }: JwtVerifiedUserType
  ) {
    return this.folderService.addFile(file, userId, parentFolderId)
  }

  @UseGuards(AuthAccessGuard)
  @Post(':parentFolderId/add-folder')
  @UseInterceptors(UploadFileInterceptor)
  addFolder (
    @Body() createFolderDto: CreateFolderDto,
    @Param('parentFolderId') parentFolderId: number,
    @User() { sub: userId }: JwtVerifiedUserType
  ) {
    return this.folderService.addFolder(createFolderDto, userId, parentFolderId)
  }

  @UseGuards(AuthAccessGuard)
  @Get(':parentFolderId/content')
  getFolderContent (
    @Param('parentFolderId') parentFolderId: number,
    @User() { sub: userId }: JwtVerifiedUserType
  ) {
    return this.folderService.getContent(userId, parentFolderId)
  }

  @UseGuards(AuthAccessGuard)
  @Get(':folderId/parents')
  getFolderParentsPath (@Param('folderId') folderId: number) {
    return this.folderService.getParentsPath(folderId)
  }
}