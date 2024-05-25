import { Expose } from 'class-transformer'
import { UserGenderEnum } from '../enums/user-gender.enum'
import { UserStartPageEnum } from '../enums/user-start-page.enum'

export class UserDto {

  @Expose()
  readonly id: number

  @Expose()
  readonly name: string

  @Expose()
  readonly surname: string

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