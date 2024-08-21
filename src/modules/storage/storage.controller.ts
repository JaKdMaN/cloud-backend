import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from 'src/decorators/user.decorator'
import { JwtVerifiedUserType } from '../auth/domain/types/jwt-verified-user.type'
import { StorageService } from './services/storage.service'
import { AuthAccessGuard } from '../auth/guards/auth-access.guard'

@Controller('storage')
export class StorageController {

  constructor(private storageService: StorageService) {}

  @UseGuards(AuthAccessGuard)
  @Get()
  getStorage (@User() user: JwtVerifiedUserType) {
    return this.storageService.getStorage(user.sub)
  }
}