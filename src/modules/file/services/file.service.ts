import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { plainToClass, plainToInstance } from 'class-transformer'

import { File } from '../file.model'
import { User } from 'src/modules/user/user.model'
import { FileDto } from '../domain/dto/file.dto'

import { ConfigService } from '@nestjs/config'
import { UserService } from 'src/modules/user/services/user.service'
import { UpdateFileDto } from '../domain/dto/update-file.dto'
import { Folder } from 'src/modules/folder/folder.model'

@Injectable()
export class FileService {

  constructor(
    @InjectModel(File) private fileRepository: typeof File,
    private configService: ConfigService,
    private userService: UserService
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

    return await this.getById(newFile.id)
  }

  async getById (fileId: number): Promise<FileDto> {
    const file = await this.fileRepository.findByPk(fileId, {
      include: [{ model: User, as: 'owner' }],
    })

    return plainToClass(FileDto, file, { excludeExtraneousValues: true })
  }

  async getFiles (ownerId: number) {
    const files = await this.fileRepository.findAll({
      raw: true,
      where: { ownerId, parentFolderId: null },
      include: [{ model: User, as: 'owner' }],
    })

    return plainToInstance(FileDto, files, { excludeExtraneousValues: true })
  }

  async getFilesFromFolder (ownerId: number, parentFolderId: number) {
    const filesFromFolder = await this.fileRepository.findAll({
      raw: true,
      where: [{ ownerId, parentFolderId }],
      include: [{ model: User, as: 'owner' }],
    })

    return plainToInstance(FileDto, filesFromFolder, { excludeExtraneousValues: true })
  }

  async getByName (fileName: string) {
    const file = await this.fileRepository.findOne({
      where: { fileName },
      include: [{ model: User, as: 'owner' }],
    })

    return plainToClass(FileDto, file, { excludeExtraneousValues: true })
  }

  async update (fileId: number, updateFileDto: UpdateFileDto) {
    const file = await this.fileRepository.findByPk(fileId, {
      include: [
        { model: User, as: 'owner' },
        { model: Folder, as: 'parentFolder' },
      ],
    })

    await file.update(updateFileDto)

    return await this.getById(file.id)
  }

  async delete (fileId: number) {
    const file = await this.fileRepository.findByPk(fileId)

    if (!file) {
      throw new HttpException('Такого файла не существует', HttpStatus.BAD_REQUEST)
    }

    return await file.destroy()
  }

  getFileUrl (file: Express.Multer.File): string {
    const { filename } = file

    const fileUrl = 
      `${this.configService.get<string>('API_URL')}:5000/api/file/${filename}`

    return fileUrl
  }
}