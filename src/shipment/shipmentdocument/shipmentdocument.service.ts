import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { shipmentdocument } from './shipmentdocument.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class shipmentdocumentService {
  constructor(private prisma: PrismaService) {}

  async getAllShipmentDocuments(): Promise<shipmentdocument[]> {
    return this.prisma.shipmentdocument.findMany();
  }

  async getShipmentDocument(
    document_id: number,
  ): Promise<shipmentdocument | null> {
    return this.prisma.shipmentdocument.findUnique({
      where: { document_id: Number(document_id) },
    });
  }

  async createShipmentDocument(
    data: Prisma.shipmentdocumentCreateInput,
  ): Promise<shipmentdocument> {
    return this.prisma.shipmentdocument.create({
      data,
    });
  }

  async updateShipmentDocument(
    document_id: number,
    data: Prisma.shipmentdocumentUpdateInput,
  ): Promise<shipmentdocument> {
    return this.prisma.shipmentdocument.update({
      where: { document_id: Number(document_id) },
      data: {
        document_type: data.document_type ?? undefined, // Update document_type if provided
        document_file: data.document_file ?? undefined, // Update document_file if provided
        shipment: data.shipment
          ? {
              // Update the shipment relation if provided
              connect: { shipment_id: data.shipment.connect?.shipment_id }, // Use 'connect' to link the shipment
            }
          : undefined,
      },
    });
  }

  async deleteShipmentDocument(document_id: number): Promise<shipmentdocument> {
    return this.prisma.shipmentdocument.delete({
      where: { document_id: Number(document_id) },
    });
  }
}
