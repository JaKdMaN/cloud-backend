import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { User } from '../user/user.model'
import { StorageEntity } from '../storage/storage-entity.model'

interface FolderCreationAttrs {
  name: string
  size: number
  ownerId: number
  createdAt: Date
}

@Table({ tableName: 'folder', updatedAt: false })
export class Folder extends Model<Folder, FolderCreationAttrs> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  name: string

  @Column({ type: DataType.INTEGER, allowNull: false })
  size: number

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt: Date

  // ----------------------- Отношения ----------------------- //

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  ownerId: number

  @BelongsTo(() => User)
  owner: User

  @HasOne(() => StorageEntity)
  storageEntity: StorageEntity

  @HasMany(() => StorageEntity)
  storageEntities: StorageEntity[]
}