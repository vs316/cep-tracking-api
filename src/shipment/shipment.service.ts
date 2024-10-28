import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShipmentWithRelations } from './shipment.types';
import { Prisma } from '@prisma/client';
import { ShipmentCreateInput } from './shipment.model';
@Injectable()
export class ShipmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ShipmentCreateInput): Promise<ShipmentWithRelations> {
    const {
      shipFromDetails,
      shipToDetails,
      paymentDetails,
      shipmentItems,
      ...shipmentData
    } = data;

    return this.prisma.shipment.create({
      data: {
        ...shipmentData,
        // Create shipfrom if details provided
        ...(shipFromDetails && {
          shipfrom: {
            create: shipFromDetails,
          },
        }),
        // Create shipto if details provided
        ...(shipToDetails && {
          shipto: {
            create: shipToDetails,
          },
        }),
        // Create payment if details provided
        ...(paymentDetails && {
          payment: {
            create: paymentDetails,
          },
        }),
        // Create shipment items if provided
        ...(shipmentItems && {
          shipmentitem: {
            create: shipmentItems,
          },
        }),
      },
      include: {
        payment: true,
        user: true,
        shipfrom: true,
        shipto: true,
        shipmentitem: true,
      },
    });
  }

  // Example of creating a complete shipment with a user
  async createCompleteShipment(
    userId: number,
    data: ShipmentCreateInput,
  ): Promise<ShipmentWithRelations> {
    return this.prisma.shipment.create({
      data: {
        //shipment_type: data.shipment_type,
        status: 'PENDING',
        is_draft: false,
        user: {
          connect: { user_id: userId },
        },
        shipfrom: data.shipFromDetails
          ? { create: data.shipFromDetails }
          : undefined,
        shipto: data.shipToDetails ? { create: data.shipToDetails } : undefined,
        payment: data.paymentDetails
          ? { create: [data.paymentDetails] }
          : undefined,
        shipmentitem: data.shipmentItems
          ? { create: data.shipmentItems }
          : undefined,
      },
      include: {
        payment: true,
        user: true,
        shipfrom: true,
        shipto: true,
        shipmentitem: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.shipmentWhereInput;
    orderBy?: Prisma.shipmentOrderByWithRelationInput;
    startDate?: Date; // Add startDate for range filtering
    endDate?: Date; // Add endDate for range filtering
  }): Promise<ShipmentWithRelations[]> {
    const { skip, take, where, orderBy, startDate, endDate } = params;

    // Modify the 'where' clause to include filtering by the created_at field
    const dateFilter =
      startDate && endDate
        ? {
            created_at: {
              gte: startDate, // Greater than or equal to the startDate
              lte: endDate, // Less than or equal to the endDate
            },
          }
        : {};

    return this.prisma.shipment.findMany({
      skip,
      take,
      where: {
        ...where,
        ...dateFilter, // Add the date filter to the existing where conditions
      },
      orderBy,
      include: {
        payment: true,
        user: true,
        shipfrom: true,
        shipto: true,
        shipmentitem: true,
      },
    });
  }

  async findOne(
    shipmentWhereUniqueInput: Prisma.shipmentWhereUniqueInput,
  ): Promise<ShipmentWithRelations | null> {
    return this.prisma.shipment.findUnique({
      where: shipmentWhereUniqueInput,
      include: {
        payment: true,
        user: true,
        shipfrom: true,
        shipto: true,
        shipmentitem: true,
      },
    });
  }
  async findShipmentsByUserId(
    userId: number,
  ): Promise<ShipmentWithRelations[]> {
    return this.prisma.shipment.findMany({
      where: { user_id: userId },
      include: {
        // Include any related entities you need (e.g., user, item details, etc.)
        payment: true,
        user: true,
        shipfrom: true,
        shipto: true,
        shipmentitem: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }
  async update(params: {
    where: Prisma.shipmentWhereUniqueInput;
    data: Prisma.shipmentUpdateInput;
  }): Promise<ShipmentWithRelations> {
    const { where, data } = params;
    return this.prisma.shipment.update({
      data,
      where,
      include: {
        payment: true,
        user: true,
        shipfrom: true,
        shipto: true,
        shipmentitem: true,
      },
    });
  }

  async delete(
    where: Prisma.shipmentWhereUniqueInput,
  ): Promise<ShipmentWithRelations> {
    return this.prisma.shipment.delete({
      where,
      include: {
        payment: true,
        user: true,
        shipfrom: true,
        shipto: true,
        shipmentitem: true,
      },
    });
  }

  async createDraftShipment(userId: number): Promise<ShipmentWithRelations> {
    return this.prisma.shipment.create({
      data: {
        user: {
          connect: { user_id: userId },
        },
        is_draft: true,
        status: 'DRAFT',
      },
      include: {
        payment: true,
        user: true,
        shipfrom: true,
        shipto: true,
        shipmentitem: true,
      },
    });
  }

  async finalizeShipment(shipmentId: number): Promise<ShipmentWithRelations> {
    return this.prisma.shipment.update({
      where: { shipment_id: shipmentId },
      data: {
        is_draft: false,
        is_finalized: true,
        status: 'FINALIZED',
      },
      include: {
        payment: true,
        user: true,
        shipfrom: true,
        shipto: true,
        shipmentitem: true,
      },
    });
  }
}
