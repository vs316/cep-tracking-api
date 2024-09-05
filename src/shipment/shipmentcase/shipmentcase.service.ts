import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { shipmentcase } from './shipmentcase.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class shipmentcaseService {
  constructor(private prisma: PrismaService) {}

  async getAllShipmentCases(): Promise<shipmentcase[]> {
    return this.prisma.shipmentcase.findMany();
  }

  async getShipmentCase(case_id: number): Promise<shipmentcase | null> {
    return this.prisma.shipmentcase.findUnique({
      where: { case_id: Number(case_id) },
    });
  }

  async createShipmentCase(
    data: Prisma.shipmentcaseCreateInput,
  ): Promise<shipmentcase> {
    return this.prisma.shipmentcase.create({
      data,
    });
  }

  async updateShipmentCase(
    case_id: number,
    data: Prisma.shipmentcaseUpdateInput,
  ): Promise<shipmentcase> {
    return this.prisma.shipmentcase.update({
      where: { case_id: Number(case_id) },
      data: {
        case_status: data.case_status ?? undefined, // Update case_status if provided
        created_at: data.created_at ?? undefined, // Update created_at if provided
        updated_at: data.updated_at ?? undefined, // Update updated_at if provided
        user: data.user
          ? {
              connect: { user_id: data.user.connect?.user_id }, // Use 'connect' to link the user
            }
          : undefined,
        shipment: data.shipment
          ? {
              connect: { shipment_id: data.shipment.connect?.shipment_id }, // Use 'connect' to link the shipment
            }
          : undefined,
      },
    });
  }

  async deleteShipmentCase(case_id: number): Promise<shipmentcase> {
    return this.prisma.shipmentcase.delete({
      where: { case_id: Number(case_id) },
    });
  }
}
