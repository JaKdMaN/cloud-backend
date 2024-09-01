import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

import { JwtVerifiedUserType } from 'src/modules/auth/domain/types/jwt-verified-user.type'

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const requets: Request = ctx.switchToHttp().getRequest()
    
    return requets.user as JwtVerifiedUserType
  }
)