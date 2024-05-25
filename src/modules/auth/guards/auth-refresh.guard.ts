import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class AuthRefreshGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest()
    
    try {
      const refreshToken = req.cookies['token']

      if (!refreshToken) {
        throw new HttpException('Вы не авторизоавны', HttpStatus.UNAUTHORIZED)
      }

      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      })
      
      return true
    } catch (error: any) {
      throw new HttpException('Вы не авторизоавны', HttpStatus.UNAUTHORIZED)
    }
  }
}