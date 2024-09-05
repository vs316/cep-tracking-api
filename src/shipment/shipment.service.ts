import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { shipment } from './shipment.model';
import { Prisma } from '@prisma/client';
@Injectable()
export class ShipmentService {
  constructor(private prisma: PrismaService) {}
  async getAllShipments(): Promise<shipment[]> {
    return this.prisma.shipment.findMany();
  }
  async getShipment(shipment_id: number): Promise<shipment | null> {
    return this.prisma.shipment.findUnique({
      where: { shipment_id: Number(shipment_id) },
    });
  }
  async createShipment(data: Prisma.shipmentCreateInput): Promise<shipment> {
    return this.prisma.shipment.create({
      data,
    });
  }
  async updateShipment(shipment_id: number, data: shipment): Promise<shipment> {
    return this.prisma.shipment.update({
      where: { shipment_id: Number(shipment_id) },
      data: {
        user_id: data.user_id,
        from_address_id: data.from_address_id,
        to_address_id: data.to_address_id,
        shipment_type: data.shipment_type,
        status: data.status,
        is_draft: data.is_draft,
        is_finalized: data.is_finalized,
        updated_at: new Date(),
      },
    });
  }

  async deleteShipment(shipment_id: number): Promise<shipment> {
    return this.prisma.shipment.delete({
      where: { shipment_id: Number(shipment_id) },
    });
  }
}
