import { Expose } from 'class-transformer'
import { DiskEntityTypeEnum } from '../enums/disk-entity-type.enum'
import { FileDto } from 'src/modules/file/domain/dto/file.dto'
import { FolderDto } from 'src/modules/folder/domain/dto/folder.dto'

export class DiskEntityDto {

  @Expose()
  id: number

  @Expose()
  type: DiskEntityTypeEnum

  @Expose()
  entity: FileDto | FolderDto
}