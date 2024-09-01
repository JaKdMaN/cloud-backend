import { Expose, Type } from 'class-transformer'
import { UserDto } from 'src/modules/user/domain/dto/user.dto'

export class FolderDto {

  @Expose()
  readonly id: number

  @Expose()
  readonly name: string

  @Expose()
  readonly size: number

  @Expose()
  readonly createdAt: Date

  @Expose()
  @Type(() => UserDto)
  readonly owner: UserDto
}