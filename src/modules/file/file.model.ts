import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript'
import { User } from '../user/user.model'
import { Folder } from '../folder/folder.model'

interface FileCreationAttrs {
  fileType: string
  fileName: string
  originalName: string
  url: string
  size: number
  extension: string
  createdAt: Date
  lastOpenedAt: Date
  ownerId: number
  parentFolderId?: number
}

@Table({ tableName: 'files', createdAt: false, updatedAt: false })
export class File extends Model<File,FileCreationAttrs> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  fileType: string

  @Column({ type: DataType.STRING, allowNull: false })
  fileName: string

  @Column({ type: DataType.STRING, allowNull: false })
  originalName: string

  @Column({ type: DataType.STRING, allowNull: false })
  url: string

  @Column({ type: DataType.INTEGER, allowNull: false })
  size: number

  @Column({ type: DataType.STRING, allowNull: false })
  extension: string

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt: Date

  @Column({ type: DataType.DATE, allowNull: false })
  lastOpenedAt: Date

  // ----------------------- Отношения ----------------------- //

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  ownerId: number

  @BelongsTo(() => User)
  owner: User

  @HasOne(() => User)
  user: User

  @ForeignKey(() => Folder)
  @Column({ type: DataType.INTEGER, allowNull: true })
  parentFolderId: number

  @BelongsTo(() => Folder)
  parentFolder: Folder
}