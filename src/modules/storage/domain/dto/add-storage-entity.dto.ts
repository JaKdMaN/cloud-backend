import { IsNumber, IsEnum, IsOptional } from 'class-validator'
import { StorageEntityTypeEnum } from '../enums/storage-entity-type.enum'

export class AddStorageEntityDto {
  
  @IsNumber()
  entityId: number
  
  @IsEnum(StorageEntityTypeEnum)
  type: StorageEntityTypeEnum

  @IsNumber()
  @IsOptional()
  parentFolderId?: number | null
}