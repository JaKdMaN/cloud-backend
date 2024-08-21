import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { StorageEntityTypeEnum } from './domain/enums/storage-entity-type.enum'
import { File } from '../file/file.model'
import { Folder } from '../folder/folder.model'
import { User } from '../user/user.model'

interface StorageEntityCreationAttrs {
  userId: number
  type: StorageEntityTypeEnum
  parentFolderId?: number
  fileId?: number
  folderId?: number
}

@Table({ tableName: 'storage_entity', createdAt: false, updatedAt: false })
export class StorageEntity extends Model<StorageEntity, StorageEntityCreationAttrs> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Column({ type: DataType.ENUM(...Object.values(StorageEntityTypeEnum)), allowNull: false })
  type: StorageEntityTypeEnum

  // ----------------------- Отношения ----------------------- //

  @ForeignKey(() => User)
  userId: number

  @BelongsTo(() => User, 'userId')
  user: User

  @ForeignKey(() => Folder)
  @Column({ type: DataType.INTEGER, allowNull: true })
  parentFolderId: number | null

  @BelongsTo(() => Folder, 'parentFolderId')
  parentFolder: Folder

  @ForeignKey(() => File)
  @Column({ type: DataType.INTEGER, allowNull: true })
  fileId: number | null

  @BelongsTo(() => File, 'fileId')
  file: File

  @ForeignKey(() => Folder)
  @Column({ type: DataType.INTEGER, allowNull: true })
  folderId: number | null

  @BelongsTo(() => Folder, 'folderId')
  folder: Folder
}