// shipment.controller.ts
import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './create-shipment.dto';
import { ShipmentItemDto } from './shipmentitem/shipment-item.dto';

@Controller('shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  // Step 1: Create a pending shipment before payment
  @Post('pending')
  async createPendingShipment(@Body() createShipmentDto: CreateShipmentDto) {
    const shipFrom = await this.shipmentService.createShipFrom(
      createShipmentDto.shipfrom,
    );
    const shipTo = await this.shipmentService.createShipTo(
      createShipmentDto.shipto,
    );
    const shipment = await this.shipmentService.createPendingShipment(
      shipFrom.shipfrom_id,
      shipTo.shipto_id,
    );

    return { shipmentId: shipment.shipment_id }; // Return the shipment ID for later use
  }

  // Step 2: Complete the shipment after successful payment
  @Put('complete/:id')
  async completeShipment(
    @Param('id') shipmentId: number,
    @Body() shipmentItems: ShipmentItemDto[],
  ) {
    const shipment = await this.shipmentService.findById(shipmentId);

    if (!shipment) {
      throw new NotFoundException('Shipment not found');
    }

    // Add shipment items and finalize the order
    await this.shipmentService.addShipmentItems(shipmentId, shipmentItems);
    return await this.shipmentService.markAsCompleted(shipmentId);
  }
}
