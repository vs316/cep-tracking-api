import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShipmentNotificationService } from './shipmentnotification.service';
import { ShipmentNotificationController } from './shipmentnotification.controller';

@Module({
  controllers: [ShipmentNotificationController],
  providers: [ShipmentNotificationService, PrismaService],
  imports: [PrismaModule],
})
export class ShipmentNotificationModule {}
