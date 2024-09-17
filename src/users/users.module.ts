/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressService } from 'src/address/address.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AddressService],
  imports: [PrismaModule],
})
export class UsersModule {}
