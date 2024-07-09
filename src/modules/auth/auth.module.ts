import { Module, forwardRef } from '@nestjs/common'

import { AuthController } from './auth.controller'

import { AuthService } from './services/auth.service'
import { HashService } from './services/hash.service'
import { TokenService } from './services/token.service'

import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module'

@Module({
  controllers: [ AuthController ],
  providers: [
    AuthService,
    HashService,
    TokenService,
  ],
  imports: [
    JwtModule.register({}),
    forwardRef(() => UserModule),
  ],
  exports: [
    AuthService,
    TokenService,
    JwtModule,
  ],
})
export class AuthModule {}