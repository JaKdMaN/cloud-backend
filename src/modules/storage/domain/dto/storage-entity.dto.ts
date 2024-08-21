import { Expose } from 'class-transformer'
import { StorageEntityTypeEnum } from '../enums/storage-entity-type.enum'
import { FileDto } from 'src/modules/file/domain/dto/file.dto'
import { FolderDto } from 'src/modules/folder/domain/dto/folder.dto'

export class StorageEntityDto {

  @Expose()
  id: number

  @Expose()
  type: StorageEntityTypeEnum

  @Expose()
  entity: FileDto | FolderDto
}