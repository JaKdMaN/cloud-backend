import { IsNumber } from 'class-validator'
import { CreateDiskEntityDto } from './create-disk-entity.dto'

export class CreateDiskEntityInFolderDto extends CreateDiskEntityDto {

  @IsNumber()
  parentFolderId: number
}