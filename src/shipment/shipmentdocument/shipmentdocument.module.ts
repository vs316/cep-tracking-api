import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { shipmentdocumentService } from './shipmentdocument.service';
import { shipmentdocumentController } from './shipmentdocument.controller';

@Module({
  controllers: [shipmentdocumentController],
  providers: [shipmentdocumentService, PrismaService],
  imports: [PrismaModule],
})
export class ShipmentDocumentModule {}
