import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { AuthLoginDto } from '../domain/dto/auth-login.dto'
import { AuthRegistrationDto } from '../domain/dto/auth-registration.dto'
import { UserDto } from 'src/modules/user/domain/dto/user.dto'

import { UserService } from 'src/modules/user/services/user.service'
import { HashService } from './hash.service'
import { TokenService } from './token.service'
import { plainToClass } from 'class-transformer'

@Injectable()
export class AuthService {

  constructor (
    private userService: UserService,
    private hashSerivce: HashService,
    private tokenService: TokenService
  ) {}

  async login (authLoginDto: AuthLoginDto) {
     const exitstsUser = await this.userService.getByEmail(authLoginDto.email)

     if (!exitstsUser) {
      throw new HttpException('Пользователя с таким email не существует', HttpStatus.BAD_REQUEST)
     }

     const isPasswordCorrect = await this.hashSerivce.verify(exitstsUser.password, authLoginDto.password)

     if (!isPasswordCorrect) {
      throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST)
     }

     const tokens = await this.tokenService.getTokens({
      sub: exitstsUser.id,
      username: exitstsUser.email,
    })
    const user = await this.userService.updateToken(exitstsUser.id, tokens.refreshToken)
    const userDto = plainToClass(UserDto, user, {
      excludeExtraneousValues: true,
    })

    return { user: userDto, tokens }
  }

  async registration (authRegistrationDto: AuthRegistrationDto) {
    const isUserExists = await this.userService.getByEmail(authRegistrationDto.email)

    if (isUserExists) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
    }

    const hashedPassword = await this.hashSerivce.hash(authRegistrationDto.password)
    const { id, email } = await this.userService.create({
      email: authRegistrationDto.email,
      password: hashedPassword,
    })
    const tokens = await this.tokenService.getTokens({
      sub: id,
      username: email,
    })

    const user = await this.userService.updateToken(id, tokens.refreshToken)
    const userDto = plainToClass(UserDto, user, {
      excludeExtraneousValues: true,
    })

    return { user: userDto, tokens }
  }

  async logout (refreshToken: string) {
    const { id } = await this.userService.getByToken(refreshToken)

    await this.userService.updateToken(id, null)

    return true
  }

  async refresh (refreshToken: string) {
    const { id, email } = await this.userService.getByToken(refreshToken)

    const tokens = await this.tokenService.getTokens({
      sub: id,
      username: email,
    })

    await this.userService.updateToken(id, tokens.refreshToken)

    return tokens
  }
}