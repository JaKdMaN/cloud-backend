import { IsEnum, IsNumber, IsOptional } from 'class-validator'
import { DiskEntityTypeEnum } from '../enums/disk-entity-type.enum'

export class CreateDiskEntityDto {

  @IsNumber()
  userId: number

  @IsEnum(DiskEntityTypeEnum)
  type: DiskEntityTypeEnum

  @IsNumber()
  @IsOptional()
  fileId?: number

  @IsNumber()
  @IsOptional()
  folderId?: number
}