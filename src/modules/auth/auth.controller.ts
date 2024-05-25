import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Response, Request } from 'express'

import { AuthLoginDto } from './domain/dto/auth-login.dto'
import { AuthRegistrationDto } from './domain/dto/auth-registration.dto'
import { UserWithTokenDto } from './domain/dto/user-with-token.dto'

import { AuthService } from './services/auth.service'
import { AuthAccessGuard } from './guards/auth-access.guard'
import { AuthRefreshGuard } from './guards/auth-refresh.guard'

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  async login (@Body() authLoginDto: AuthLoginDto, @Res() res: Response) {
    const { user, tokens } = await this.authService.login(authLoginDto)
    const { accessToken, refreshToken } = tokens

    const userWithToken = new UserWithTokenDto()
    userWithToken.user = user
    userWithToken.token = accessToken

    res.cookie('token', refreshToken, { httpOnly: true })
    res.status(200).send(userWithToken)
  }

  @Post('registration')
  async registration (@Body() authRegistrationDto: AuthRegistrationDto, @Res() res: Response) {
    const { user, tokens } = await this.authService.registration(authRegistrationDto)
    const { accessToken, refreshToken } = tokens

    const userWithToken = new UserWithTokenDto()
    userWithToken.user = user
    userWithToken.token = accessToken

    res.cookie('token', refreshToken, { httpOnly: true })
    res.status(201).send(userWithToken)
  }

  @UseGuards(AuthAccessGuard)
  @Post('logout')
  logout (@Req() req: Request, @Res() res: Response) {
    const refreshToken: string = req.cookies['token']

    this.authService.logout(refreshToken)
 
    res.clearCookie('token')
    res.status(200).send()
  }

  @UseGuards(AuthRefreshGuard)
  @Get('refresh')
  refresh (@Req() req: Request) {
    const refreshToken = req.cookies['token']
    
    return this.authService.refresh(refreshToken)
  }
}