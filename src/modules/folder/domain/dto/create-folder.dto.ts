import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateFolderDto {
  @IsString()
  name: string

  @IsNumber()
  @IsOptional()
  parentFolderId?: number
}