import { Expose } from 'class-transformer'
import { FileDto } from 'src/modules/file/domain/dto/file.dto'
import { FolderDto } from 'src/modules/folder/domain/dto/folder.dto'

export class StorageEntityDto {

  @Expose()
  type: 'file' | 'folder'

  @Expose()
  entity: FolderDto | FileDto
}