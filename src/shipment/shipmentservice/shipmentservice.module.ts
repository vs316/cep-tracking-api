import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShipmentServiceService } from './shipmentservice.service';
import { ShipmentServiceController } from './shipmentservice.controller';

@Module({
  controllers: [ShipmentServiceController],
  providers: [ShipmentServiceService, PrismaService],
  imports: [PrismaModule],
})
export class ShipmentServiceModule {}
