import { IsNumber, IsOptional } from 'class-validator'

export class UpdateFileDto {

  @IsNumber()
  @IsOptional()
  parentFolderId: number
}