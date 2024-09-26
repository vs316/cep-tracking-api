import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShipFromService } from './shipfrom.service';
import { ShipFromController } from './shipfrom.controller';

@Module({
  controllers: [ShipFromController],
  providers: [ShipFromService, PrismaService],
  imports: [PrismaModule],
})
export class ShipFromModule {}
