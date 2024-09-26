import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShipToService } from './shipto.service';
import { ShipToController } from './shipto.controller';

@Module({
  controllers: [ShipToController],
  providers: [ShipToService, PrismaService],
  imports: [PrismaModule],
})
export class ShipToModule {}
