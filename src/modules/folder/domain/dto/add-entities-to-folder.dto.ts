import { IsArray } from 'class-validator'

export class AddEntitiesToFolderDto {

  @IsArray()
  fileIds: number[]

  @IsArray()
  folderIds: number[]
}