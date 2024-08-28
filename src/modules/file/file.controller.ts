import {
  Controller,
  Param,
  Post,
  Get,
  Res,
  Req, 
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { AuthAccessGuard } from '../auth/guards/auth-access.guard'
import { FileService } from './services/file.service'
import { TokenService } from '../auth/services/token.service'
import { UploadFileInterceptor } from 'src/interceptors/upload-file.interceptor'

@Controller('file')
export class FileController {

  constructor(
    private fileService: FileService,
    private tokenService: TokenService
  ) {}

  @UseGuards(AuthAccessGuard)
  @Post('upload')
  @UseInterceptors(UploadFileInterceptor)
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const accessToken = req.headers.authorization.split(' ')[1]
    const { sub: ownerId } = this.tokenService.decodeToken(accessToken)
    
    return this.fileService.create(file, ownerId)
  }

  @Get(':filename')
  async getFile (@Param('filename') filename: string, @Res() res: Response) {
    const { originalName } = await this.fileService.getByName(filename)
    
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`)
    res.sendFile(filename, { root: './uploads' })
  }
}