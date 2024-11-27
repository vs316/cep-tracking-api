 
import { Module } from '@nestjs/common';
import { CourierService } from './courier.service';
import { CourierController } from './courier.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [CourierController],
  providers: [CourierService, PrismaService],
  imports: [PrismaModule],
})
export class CourierModule {}
