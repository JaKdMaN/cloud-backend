import { IsEmail, IsString } from 'class-validator'

export class AuthRegistrationDto {

  @IsEmail()
  email: string

  @IsString()
  password: string
}