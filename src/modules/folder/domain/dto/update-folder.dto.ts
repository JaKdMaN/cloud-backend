import { IsNumber, IsString } from 'class-validator'

export class UpdateFolderDto {

  @IsString()
  name: string

  @IsNumber()
  size: number
}