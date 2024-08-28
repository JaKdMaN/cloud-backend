import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { UploadFileInterceptor } from 'src/interceptors/upload-file.interceptor'
import { User } from 'src/decorators/user.decorator'

import { DiskEntityDto } from '../disk-entity/domain/dto/disk-entity.dto'
import { JwtVerifiedUserType } from '../auth/domain/types/jwt-verified-user.type'

import { StorageService } from './services/storage.service'
import { AuthAccessGuard } from '../auth/guards/auth-access.guard'
import { CreateFolderDto } from '../folder/domain/dto/create-folder.dto'

@Controller('storage')
export class StorageController {

  constructor (private storageService: StorageService) {}

  @UseGuards(AuthAccessGuard)
  @Post('add-file')
  @UseInterceptors(UploadFileInterceptor)
  addFile (
    @UploadedFile() file: Express.Multer.File,
    @User() { sub: userId }: JwtVerifiedUserType
  ): Promise<DiskEntityDto> {
    return this.storageService.addFile(file, userId)
  }

  @UseGuards(AuthAccessGuard)
  @Post('add-folder')
  addFolder (
    @Body() createFolderDto: CreateFolderDto,
    @User() { sub: userId }: JwtVerifiedUserType
  ): Promise<DiskEntityDto> {
    return this.storageService.addFolder(createFolderDto, userId)
  }

  @UseGuards(AuthAccessGuard)
  @Get()
  getStorage (@User() { sub: userId }: JwtVerifiedUserType) {
    return this.storageService.getAll(userId)
  }
}