import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { shipmentservice } from './shipmentservice.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShipmentServiceService {
  constructor(private prisma: PrismaService) {}

  async getAllShipmentServices(): Promise<shipmentservice[]> {
    return this.prisma.shipmentservice.findMany();
  }

  async getShipmentService(
    shipment_service_id: number,
  ): Promise<shipmentservice | null> {
    return this.prisma.shipmentservice.findUnique({
      where: { shipment_service_id: Number(shipment_service_id) },
    });
  }

  async createShipmentService(
    data: Prisma.shipmentserviceCreateInput,
  ): Promise<shipmentservice> {
    return this.prisma.shipmentservice.create({
      data,
    });
  }

  async updateShipmentService(
    shipment_service_id: number,
    data: Prisma.shipmentserviceUpdateInput,
  ): Promise<shipmentservice> {
    return this.prisma.shipmentservice.update({
      where: { shipment_service_id: Number(shipment_service_id) },
      data: {
        service_id: data.service_id,
        service_name: data.service_name,
        service_description: data.service_description,
        service_price: data.service_price,
        service_status: data.service_status,
        updated_at: new Date(),
        shipment: data.shipment
          ? {
              connect: { shipment_id: data.shipment.connect?.shipment_id }, // Use 'connect' to link the shipment
            }
          : undefined,
      },
    });
  }

  async deleteShipmentService(
    shipment_service_id: number,
  ): Promise<shipmentservice> {
    return this.prisma.shipmentservice.delete({
      where: { shipment_service_id: Number(shipment_service_id) },
    });
  }
}
