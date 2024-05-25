import { Module, forwardRef } from '@nestjs/common'

import { AuthController } from './auth.controller'

import { AuthService } from './services/auth.service'
import { HashService } from './services/hash.service'
import { TokenService } from './services/token.service'

import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  providers: [ AuthService, HashService, TokenService ],
  controllers: [ AuthController ],
  imports: [
    JwtModule.register({}),
    ConfigModule,
    forwardRef(() => UserModule),
  ],
  exports: [
    AuthService,
    JwtModule,
  ],
})
export class AuthModule {}