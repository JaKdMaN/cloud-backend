import { Expose, Type } from 'class-transformer'
import { UserGenderEnum } from '../enums/user-gender.enum'
import { UserStartPageEnum } from '../enums/user-start-page.enum'
import { FileDto } from 'src/modules/file/domain/dto/file.dto'

export class UserDto {

  @Expose()
  readonly id: number

  @Expose()
  readonly name: string

  @Expose()
  readonly surname: string

  @Expose()
  @Type(() => FileDto)
  avatar: FileDto | null

  @Expose()
  readonly phone: string

  @Expose()
  readonly dateOfBirth: string

  @Expose()
  readonly gender: UserGenderEnum

  @Expose()
  readonly startPage: UserStartPageEnum

  @Expose()
  readonly email: string
}