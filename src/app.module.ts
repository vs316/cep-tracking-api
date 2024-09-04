/* eslint-disable prettier/prettier */
// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UsersModule } from './users/users.module';
// import { join } from 'path';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         type: 'mysql',
//         host: configService.get('DATABASE_HOST'),
//         port: +configService.get('DATABASE_PORT'),
//         username: configService.get('DATABASE_USERNAME'),
//         password: configService.get('DATABASE_PASSWORD'),
//         database: configService.get('DATABASE_NAME'),
//         entities: [join(process.cwd(), 'dist/**/*.entity.js')],
//         synchronize: true,
//       }),
//       inject: [ConfigService],
//     }),
//     UsersModule,
//   ],
//   controllers: [AppController],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    // Add other modules here
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
