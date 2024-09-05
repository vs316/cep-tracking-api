import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShipmentNotification } from './shipmentnotification.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShipmentNotificationService {
  constructor(private prisma: PrismaService) {}

  async getAllShipmentNotifications(): Promise<ShipmentNotification[]> {
    return this.prisma.shipmentnotification.findMany();
  }

  async getShipmentNotification(
    notification_id: number,
  ): Promise<ShipmentNotification | null> {
    return this.prisma.shipmentnotification.findUnique({
      where: { notification_id: Number(notification_id) },
    });
  }

  async createShipmentNotification(
    data: Prisma.shipmentnotificationCreateInput,
  ): Promise<ShipmentNotification> {
    return this.prisma.shipmentnotification.create({
      data,
    });
  }

  async updateShipmentNotification(
    notification_id: number,
    data: Prisma.shipmentnotificationUpdateInput,
  ): Promise<ShipmentNotification> {
    return this.prisma.shipmentnotification.update({
      where: { notification_id: Number(notification_id) },
      data: {
        notification_type: data.notification_type, // Updates the notification type
        sent_at: data.sent_at ?? new Date(), // Updates 'sent_at' or sets it to the current date
        shipment: data.shipment
          ? {
              // Updates the shipment relation if provided
              connect: { shipment_id: data.shipment.connect?.shipment_id }, // Use 'connect' to update the relation
            }
          : undefined,
      },
    });
  }

  async deleteShipmentNotification(
    notification_id: number,
  ): Promise<ShipmentNotification> {
    return this.prisma.shipmentnotification.delete({
      where: { notification_id: Number(notification_id) },
    });
  }
}
