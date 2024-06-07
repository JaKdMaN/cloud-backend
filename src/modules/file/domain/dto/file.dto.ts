import { Expose, Type } from 'class-transformer'
import { UserDto } from 'src/modules/user/domain/dto/user.dto'

export class FileDto {

  @Expose()
  readonly id: number

  @Expose()
  readonly fileType: string

  @Expose()
  readonly fileName: string

  @Expose()
  readonly originalName: string

  @Expose()
  readonly url: string

  @Expose()
  readonly size: string

  @Expose()
  readonly extension: string

  @Expose()
  readonly createdAt: Date

  @Expose()
  @Type(() => UserDto)
  readonly owner: UserDto
}