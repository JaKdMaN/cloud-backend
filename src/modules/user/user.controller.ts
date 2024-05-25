import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { UserService } from './services/user.service'
import { UpdateUserDto } from './domain/dto/update-user.dto'
import { plainToClass } from 'class-transformer'
import { UserDto } from './domain/dto/user.dto'
import { AuthAccessGuard } from '../auth/guards/auth-access.guard'

@Controller('user')
export class UserController {

  constructor (private userService: UserService) {}

  @UseGuards(AuthAccessGuard)
  @Get()
  getUser (@Req() req: Request) {
    const refreshToken = req.cookies['token']
    const user = this.userService.getByToken(refreshToken)
    const userDto = plainToClass(UserDto, user, {
      excludeExtraneousValues: true,
    })

    return userDto
  }

  @UseGuards(AuthAccessGuard)
  @Put('update')
  updateUser (@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    const refreshToken = req.cookies['token']
    const user = this.userService.update(refreshToken, updateUserDto)

    const userDto = plainToClass(UserDto, user, {
      excludeExtraneousValues: true,
    })

    return userDto
  }
}