import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { File } from 'src/modules/file/file.model'
import { User } from 'src/modules/user/user.model'

interface FolderCreationAttrs {
  name: string
  size: number
  createdAt: Date
  lastOpenedAt: Date
  ownerId: number
  parentFolderId?: number
}

@Table({ tableName: 'folders', createdAt: false, updatedAt: false })
export class Folder extends Model<Folder, FolderCreationAttrs> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  name: string

  @Column({ type: DataType.INTEGER, allowNull: false })
  size: number

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

  @ForeignKey(() => Folder)
  @Column({ type: DataType.INTEGER, allowNull: true })
  parentFolderId: number

  @BelongsTo(() => Folder)
  parentFolder: Folder

  @HasMany(() => Folder, { onDelete: 'CASCADE' })
  folders: Folder[]

  @HasMany(() => File, { onDelete: 'CASCADE' })
  files: File[]
}