import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { UserGenderEnum } from './domain/enums/user-gender.enum'
import { UserStartPageEnum } from './domain/enums/user-start-page.enum'
import { File } from '../file/file.model'
import { Folder } from '../folder/folder.model'

interface UserCreationAttrs {
  email: string
  password: string
}

@Table({ tableName: 'users', createdAt: false, updatedAt: false })
export class User extends Model<User, UserCreationAttrs>{

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Column({ type: DataType.STRING, allowNull: true })
  name: string

  @Column({ type: DataType.STRING, allowNull: true })
  surname: string

  @Column({ type: DataType.STRING, allowNull: true })
  phone: string

  @Column({ type: DataType.STRING, allowNull: true })
  dateOfBirth: string

  @Column({ type: DataType.ENUM(...Object.values(UserGenderEnum)), allowNull: true })
  gender: UserGenderEnum

  @Column({ type: DataType.ENUM(...Object.values(UserStartPageEnum)), allowNull: true })
  startPage: UserStartPageEnum

  @Column({ type: DataType.STRING, unique: true , allowNull: false })
  email: string

  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @Column({ type: DataType.STRING, allowNull: true })
  refreshToken: string

  // ----------------------- Отношения ----------------------- //

  @ForeignKey(() => File)
  @Column({ type: DataType.INTEGER, allowNull: true })
  avatarId: number

  @BelongsTo(() => File)
  avatar: File

  @HasMany(() => File, { onDelete: 'CASCADE' })
  files: File[] 

  @HasMany(() => Folder, { onDelete: 'CASCADE' })
  folders: Folder[]
}