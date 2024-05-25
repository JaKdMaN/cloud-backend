import { UserDto } from 'src/modules/user/domain/dto/user.dto'

export class UserWithTokenDto {
  user: UserDto
  token: string
}