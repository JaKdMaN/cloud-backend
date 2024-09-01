import { Expose } from 'class-transformer'

export class DiskEntityShortDto {

  @Expose()
  id: number

  @Expose()
  entityName: string
}