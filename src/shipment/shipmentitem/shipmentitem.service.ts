import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { shipmentitem } from './shipmentitem.model';
import { Prisma } from '@prisma/client';
@Injectable()
export class ShipmentItemService {
  constructor(private prisma: PrismaService) {}
  async getAllShipmentItems(): Promise<shipmentitem[]> {
    return this.prisma.shipmentitem.findMany();
  }
  async getShipmentItem(
    shipment_item_id: number,
  ): Promise<shipmentitem | null> {
    return this.prisma.shipmentitem.findUnique({
      where: { shipment_item_id: Number(shipment_item_id) },
    });
  }
  async createShipmentItem(
    data: Prisma.shipmentitemCreateInput,
  ): Promise<shipmentitem> {
    return this.prisma.shipmentitem.create({
      data,
    });
  }
  async updateShipmentItem(
    shipment_item_id: number,
    data: Prisma.shipmentitemUpdateInput, // Use Prisma's input type for the data parameter
  ): Promise<shipmentitem> {
    return this.prisma.shipmentitem.update({
      where: { shipment_item_id: Number(shipment_item_id) },
      data: {
        item_description: data.item_description ?? undefined, // Update item_description if provided
        quantity: data.quantity ?? undefined, // Update quantity if provided
        weight: data.weight ?? undefined, // Update weight if provided
        value: data.value ?? undefined, // Update value if provided
        shipment: data.shipment
          ? {
              connect: { shipment_id: data.shipment.connect?.shipment_id }, // Use 'connect' to link the shipment
            }
          : undefined,
      },
    });
  }

  async deleteShipmentItem(shipment_item_id: number): Promise<shipmentitem> {
    return this.prisma.shipmentitem.delete({
      where: { shipment_item_id: Number(shipment_item_id) },
    });
  }
}
