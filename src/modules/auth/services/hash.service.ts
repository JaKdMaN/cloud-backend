import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'

@Injectable()
export class HashService {

  hash(password: string) {
    return argon2.hash(password)
  }

  async verify (hashPassword, password) {
    return await argon2.verify(hashPassword, password)
  }
}