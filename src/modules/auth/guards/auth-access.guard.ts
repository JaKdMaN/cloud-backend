import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'

import { JwtVerifiedUserType } from '../domain/types/jwt-verified-user.type'

import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthAccessGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest()

    try {
      const header = req.headers.authorization
      const [ bearer, token ] = header.split(' ')

      if ( bearer !== 'Bearer' || !token) {
        throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED)
      }

      const user: JwtVerifiedUserType = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      })
      req.user = user

      return true
    } catch (error: any) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED)
    }
  }
}