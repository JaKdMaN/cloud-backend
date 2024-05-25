import { InjectModel } from '@nestjs/sequelize'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { User } from '../user.model'
import { UpdateUserDto } from '../domain/dto/update-user.dto'
import { AuthRegistrationDto } from 'src/modules/auth/domain/dto/auth-registration.dto'

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create (authRegistrationDto: AuthRegistrationDto) {
    return await this.userRepository.create(authRegistrationDto)
  }

  async getByEmail (email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } })
  }

  async getByToken (refreshToken: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { refreshToken } })
  }

  async update (refreshToken:string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { refreshToken } })

    if (user) {
      return await user.update(updateUserDto)
    }

    throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)
  }

  async updateToken (id: number, refreshToken: string| null) {
    const user = await this.userRepository.findByPk(id)

    if (user) {
      return await user.update({ refreshToken })
    }

    throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)
  }
}