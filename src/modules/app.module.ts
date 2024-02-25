import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'cloud',
      models: [],
      autoLoadModels: true,
    }),
  ],
})
export class AppModule {}
