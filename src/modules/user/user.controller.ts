import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { plainToClass } from 'class-transformer'

import { UserDto } from './domain/dto/user.dto'
import { UpdateUserDto } from './domain/dto/update-user.dto'

import { AuthAccessGuard } from '../auth/guards/auth-access.guard'
import { TokenService } from '../auth/services/token.service'
import { UserService } from './services/user.service'

@Controller('user')
export class UserController {

  constructor (
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  @UseGuards(AuthAccessGuard)
  @Get()
  getUser (@Req() req: Request): UserDto {
    const accessToken = req.headers.authorization.split(' ')[1]
    const { sub: userId } = this.tokenService.decodeToken(accessToken)

    const user = this.userService.getById(userId)

    const userDto = plainToClass(UserDto, user, {
      excludeExtraneousValues: true,
    })

    return userDto
  }

  @UseGuards(AuthAccessGuard)
  @Put('update')
  updateUser (@Body() updateUserDto: UpdateUserDto, @Req() req: Request): UserDto {
    const accessToken = req.headers.authorization.split(' ')[1]
    const { sub: userId } = this.tokenService.decodeToken(accessToken)

    const user = this.userService.update(userId, updateUserDto)

    const userDto = plainToClass(UserDto, user, {
      excludeExtraneousValues: true,
    })

    return userDto
  }
}