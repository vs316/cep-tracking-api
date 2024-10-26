// shipment.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentWithRelations } from './shipment.types';
import { Prisma } from '@prisma/client';

type ShipmentCreateInput = Prisma.shipmentCreateInput;
@Controller('shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Post()
  async create(
    @Body() createShipmentDto: ShipmentCreateInput,
  ): Promise<ShipmentWithRelations> {
    return this.shipmentService.create(createShipmentDto);
  }

  @Post('complete')
  async createComplete(
    @Body() data: { userId: number; shipmentData: ShipmentCreateInput },
  ): Promise<ShipmentWithRelations> {
    return this.shipmentService.createCompleteShipment(
      data.userId,
      data.shipmentData,
    );
  }

  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('userId') userId?: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string, // Add startDate query param
    @Query('endDate') endDate?: string, // Add endDate query param
  ): Promise<ShipmentWithRelations[]> {
    const params = {
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where: {
        ...(userId && { user_id: parseInt(userId) }),
        ...(status && { status }),
      },
      orderBy: { created_at: 'desc' as const },
      // Parse the date strings into JavaScript Date objects
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    };
    return this.shipmentService.findAll(params);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ShipmentWithRelations | null> {
    return this.shipmentService.findOne({ shipment_id: id });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.shipmentUpdateInput,
  ): Promise<ShipmentWithRelations> {
    return this.shipmentService.update({
      where: { shipment_id: id },
      data,
    });
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ShipmentWithRelations> {
    return this.shipmentService.delete({ shipment_id: id });
  }

  @Post('draft')
  async createDraft(
    @Body('userId', ParseIntPipe) userId: number,
  ): Promise<ShipmentWithRelations> {
    return this.shipmentService.createDraftShipment(userId);
  }

  @Post(':id/finalize')
  async finalizeShipment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ShipmentWithRelations> {
    return this.shipmentService.finalizeShipment(id);
  }
}
