// shipment.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming Prisma is used
import { CreateAddressDto } from './create-shipment.dto';
import { ShipmentItemDto } from './shipmentitem/shipment-item.dto';

@Injectable()
export class ShipmentService {
  constructor(private readonly prisma: PrismaService) {}

  // Create 'ship from' address
  async createShipFrom(createAddressDto: CreateAddressDto) {
    return await this.prisma.shipfrom.create({
      data: createAddressDto,
    });
  }

  // Create 'ship to' address
  async createShipTo(createAddressDto: CreateAddressDto) {
    return await this.prisma.shipto.create({
      data: createAddressDto,
    });
  }

  // Create a pending shipment
  async createPendingShipment(from_address_id: number, to_address_id: number) {
    return await this.prisma.shipment.create({
      data: {
        from_address_id,
        to_address_id,
        status: 'pending', // Set the status to pending
      },
    });
  }

  // Find shipment by ID
  async findById(shipmentId: number) {
    return await this.prisma.shipment.findUnique({
      where: { shipment_id: shipmentId },
    });
  }

  // Add items to shipment
  async addShipmentItems(
    shipment_id: number,
    shipmentItems: ShipmentItemDto[],
  ) {
    for (const item of shipmentItems) {
      await this.prisma.shipmentitem.create({
        data: {
          shipment_id,
          ...item,
        },
      });
    }
  }

  // Mark shipment as completed after payment
  async markAsCompleted(shipmentId: number) {
    return await this.prisma.shipment.update({
      where: { shipment_id: shipmentId },
      data: {
        status: 'completed', // Update the status to completed after payment
      },
    });
  }
}
