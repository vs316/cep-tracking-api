 
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService],
  imports: [PrismaModule],
})
export class AdminModule {}
