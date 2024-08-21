import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { User } from 'src/decorators/user.decorator'
import { AuthAccessGuard } from '../auth/guards/auth-access.guard'
import { JwtVerifiedUserType } from '../auth/domain/types/jwt-verified-user.type'
import { FolderService } from './services/folder.service'
import { CreateFolderDto } from './domain/dto/create-folder.dto'

@Controller('folders')
export class FolderController {

  constructor(private folderService: FolderService) {}
  
  @UseGuards(AuthAccessGuard)
  @Post('create')
  create (@User() user: JwtVerifiedUserType, @Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(user.sub, createFolderDto)
  }
}