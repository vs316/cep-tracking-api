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
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { ShipmentModule } from './shipment/shipment.module';
import { PaymentModule } from './payment/payment.module';
import { ShipmentItemModule } from './shipment/shipmentitem/shipmentitem.module';
import { ShipFromModule } from './shipment/shipfrom/shipfrom.module';
import { ShipToModule } from './shipment/shipto/shipto.module';
import { AdminModule } from './admin/administrator/admin.module';
import { CourierModule } from './admin/courier/courier.module';
import { OrdersModule } from './shipment/orders.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AddressModule,
    ShipmentModule,
    ShipmentItemModule,
    PaymentModule,
    ShipFromModule,
    ShipToModule,
    AdminModule,
    CourierModule,
    OrdersModule,
    // Add other modules here
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
