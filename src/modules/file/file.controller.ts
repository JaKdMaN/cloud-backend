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

import { FileInterceptor } from '@nestjs/platform-express'
import { Request, Response } from 'express'
import { diskStorage } from 'multer'

import { FileService } from './services/file.service'
import { AuthAccessGuard } from '../auth/guards/auth-access.guard'

@Controller('file')
export class FileController {

  constructor(private fileService: FileService) {}

  @UseGuards(AuthAccessGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf-8')
        const [ name, extenstion ] = originalName.split('.')
        const newFileName = `${name.split(' ').join('-')}_${Date.now()}.${extenstion}`

        callback(null, newFileName)
      },
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const refreshToken = req.cookies['token']
    
    return this.fileService.create(file, refreshToken)
  }

  @Get('upload/:filename')
  async getFile (@Param('filename') filename: string, @Res() res: Response) {
    const { originalName } = await this.fileService.getByName(filename)
    
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`)
    res.sendFile(filename, { root: './uploads' })
  }
}