import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { AuthAccessGuard } from '../auth/guards/auth-access.guard'
import { StorageService } from './services/storage.service'
import { TokenService } from '../auth/services/token.service'

@Controller('storage')
export class StorageController {

  constructor(
    private storageService: StorageService,
    private tokenService: TokenService
  ) {}

  @UseGuards(AuthAccessGuard)
  @Get()
  getStorage (@Req() req: Request) {
    const accessToken = req.headers.authorization.split(' ')[1]
    const { sub: ownerId } = this.tokenService.decodeToken(accessToken)

    return this.storageService.getStorage(ownerId)
  }

  @UseGuards(AuthAccessGuard)
  @Get(':folderId')
  getFolderStorage (@Param() folderId: number, @Req() req: Request) {
    const accessToken = req.headers.authorization.split(' ')[1]
    const { sub: ownerId } = this.tokenService.decodeToken(accessToken)

    return this.storageService.getFolderStorage(ownerId, folderId)
  }
}