import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { plainToClass } from 'class-transformer'

import { File } from '../file.model'
import { User } from 'src/modules/user/user.model'
import { FileDto } from '../domain/dto/file.dto'
import { StorageEntityTypeEnum } from 'src/modules/storage/domain/enums/storage-entity-type.enum'

import { ConfigService } from '@nestjs/config'
import { StorageService } from 'src/modules/storage/services/storage.service'

@Injectable()
export class FileService {

  constructor(
    @InjectModel(File) private fileRepository: typeof File,
    private configService: ConfigService,
    private storageService: StorageService
  ) {}

  async create (file: Express.Multer.File, ownerId: number): Promise<FileDto> {

    if (!file) {
      throw new HttpException('Ошибка загрузки файла', HttpStatus.BAD_REQUEST)
    }

    const { filename, originalname, size, mimetype } = file
    const extension = `.${originalname.split('.')[1]}`

    const newFile = await this.fileRepository.create({
      fileType: mimetype,
      fileName: filename,
      originalName: originalname,
      url: this.getFileUrl(file),
      createdAt: new Date(),
      lastOpenedAt: new Date(),
      ownerId,
      size,
      extension,
    })

    await this.storageService.addEntity(ownerId, {
      entityId: newFile.id,
      type: StorageEntityTypeEnum.FILE,
    })

    return await this.getById(newFile.id)
  }

  async getById (fileId: number): Promise<FileDto> {
    const file = await this.fileRepository.findByPk(fileId, {
      include: [{ model: User, as: 'owner' }],
    })

    return plainToClass(FileDto, file, { excludeExtraneousValues: true })
  }

  async getByName (fileName: string) {
    const file = await this.fileRepository.findOne({
      where: { fileName },
      include: [{ model: User, as: 'owner' }],
    })

    return plainToClass(FileDto, file, { excludeExtraneousValues: true })
  }

  getFileUrl (file: Express.Multer.File): string {
    const { filename } = file

    const fileUrl = 
      `${this.configService.get<string>('API_URL')}:5000/api/file/${filename}`

    return fileUrl
  }
}