import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShipmentItemService } from './shipmentitem.service';
import { ShipmentItemController } from './shipmentitem.controller';

@Module({
  controllers: [ShipmentItemController],
  providers: [ShipmentItemService, PrismaService],
  imports: [PrismaModule],
})
export class ShipmentItemModule {}
