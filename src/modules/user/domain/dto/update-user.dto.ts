import { IsString, IsEmail, IsEnum, IsOptional, IsPhoneNumber } from 'class-validator'
import { UserGenderEnum } from '../enums/user-gender.enum'
import { UserStartPageEnum } from '../enums/user-start-page.enum'

export class UpdateUserDto {

  @IsString()
  @IsOptional()
  readonly name: string

  @IsString()
  @IsOptional()
  readonly surname: string

  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  readonly phone: string

  @IsString()
  @IsOptional()
  readonly dateOfBirth: string

  @IsString()
  @IsEnum(UserGenderEnum, { each: true })
  @IsOptional()
  readonly gender: UserGenderEnum

  @IsString()
  @IsEnum(UserStartPageEnum, { each: true })
  @IsOptional()
  readonly startPage: UserStartPageEnum

  @IsString()
  @IsEmail()
  readonly email: string
}