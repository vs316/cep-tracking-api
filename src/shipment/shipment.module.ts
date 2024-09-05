import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';

@Module({
  controllers: [ShipmentController],
  providers: [ShipmentService, PrismaService],
  imports: [PrismaModule],
})
export class ShipmentModule {}
