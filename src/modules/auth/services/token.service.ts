import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { JwtPayloadType } from '../domain/types/jwt-payload.type'

@Injectable()
export class TokenService {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async getTokens (jwtPayload: JwtPayloadType) {
    const [ accessToken, refreshToken ] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ])

    return { accessToken, refreshToken }
  }

  decodeToken (token: string) {
    return this.jwtService.decode(token)
  }
}