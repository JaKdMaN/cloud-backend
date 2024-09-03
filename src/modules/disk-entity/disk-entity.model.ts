import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DiskEntityTypeEnum } from './domain/enums/disk-entity-type.enum'
import { User } from '../user/user.model'
import { File } from '../file/file.model'
import { Folder } from '../folder/folder.model'

interface DiskEntityCreationAttrs {
  userId: number
  type: DiskEntityTypeEnum
  fileId?: number
  folderId?: number
  parentFolderId?: number
}

@Table({ tableName: 'disk_entity', createdAt: false, updatedAt: false })
export class DiskEntity extends Model<DiskEntity, DiskEntityCreationAttrs> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Column({ type: DataType.ENUM(...Object.values(DiskEntityTypeEnum)), allowNull: false })
  type: DiskEntityTypeEnum

  // ----------------------- Отношения ----------------------- //

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => File)
  @Column({ type: DataType.INTEGER, allowNull: true })
  fileId: number | null

  @BelongsTo(() => File)
  file: File | null

  @ForeignKey(() => Folder)
  @Column({ type: DataType.INTEGER, allowNull: true })
  folderId: number | null

  @BelongsTo(() => Folder, 'folderId')
  folder: Folder | null

  @ForeignKey(() => Folder)
  @Column({ type: DataType.INTEGER, allowNull: true })
  parentFolderId: number | null

  @BelongsTo(() => Folder, 'parentFolderId')
  parentFolder: Folder | null
}