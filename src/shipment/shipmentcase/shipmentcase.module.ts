import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { shipmentcaseService } from './shipmentcase.service';
import { shipmentcaseController } from './shipmentcase.controller';

@Module({
  controllers: [shipmentcaseController],
  providers: [shipmentcaseService, PrismaService],
  imports: [PrismaModule],
})
export class ShipmentCaseModule {}
