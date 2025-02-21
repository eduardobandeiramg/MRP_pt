import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow<number>('MYSQL_PORT'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
        extra: {
          authPlugin: 'mysql_native_password', // Adicione esta linha para especificar o plugin de autenticação
        },
        driver: require('mysql2'), // Adicione esta linha para garantir que o driver mysql2 seja usado
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}