import { InjectModel } from '@nestjs/sequelize'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { User } from '../user.model'
import { File } from 'src/modules/file/file.model'
import { UpdateUserDto } from '../domain/dto/update-user.dto'
import { AuthRegistrationDto } from 'src/modules/auth/domain/dto/auth-registration.dto'

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create (authRegistrationDto: AuthRegistrationDto) {
    const { id } =  await this.userRepository.create(authRegistrationDto)

    return await this.getById(id)
  }

  async getById (userId: number): Promise<User| null> {
    return await this.userRepository.findByPk(userId, {
      include: [
        { 
          model: File, 
          as: 'avatar',
          include: [{ model: User, as: 'owner' }],
        },
      ],
    })
  }

  async getByEmail (email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      include: [
        { 
          model: File, 
          as: 'avatar',
          include: [{ model: User, as: 'owner' }],
        },
      ],
    })
  }

  async update (userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(userId)

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)
    }

    await user.update(updateUserDto)

    return await this.getById(user.id)
  }

  async updateToken (userId: number, refreshToken: string| null) {
    const user = await this.userRepository.findByPk(userId)

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)
    }

    return await user.update({ refreshToken })
  }
}