import { IsString, IsEmail } from 'class-validator'

export class AuthLoginDto {

  @IsString()
  @IsEmail()
  readonly email: string

  @IsString()
  readonly password: string
}