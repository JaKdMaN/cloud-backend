import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './services/user.service'
import { UserController } from './user.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './user.model'
import { AuthModule } from '../auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  controllers: [ UserController ],
  providers: [ UserService ],
  imports: [ 
    SequelizeModule.forFeature([ User ]),
    forwardRef(() => AuthModule),
    ConfigModule,
  ],
  exports: [ UserService ],
})
export class UserModule {}