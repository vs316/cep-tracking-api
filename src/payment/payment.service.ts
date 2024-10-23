import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { payment } from './payment.model';
import { Prisma } from '@prisma/client';
@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllPayments(): Promise<payment[]> {
    return this.prisma.payment.findMany();
  }
  async getPayment(payment_id: number): Promise<payment | null> {
    return this.prisma.payment.findUnique({
      where: { payment_id: Number(payment_id) },
    });
  }
  async createPayment(data: Prisma.paymentCreateInput): Promise<payment> {
    return this.prisma.payment.create({
      data,
    });
  }
  async updatePayment(
    payment_id: number,
    data: Prisma.paymentUpdateInput, // Use Prisma's input type for the data parameter
  ): Promise<payment> {
    return this.prisma.payment.update({
      where: { payment_id: Number(payment_id) },
      data: {
        amount: data.amount ?? undefined, // Update amount if provided
        payment_method: data.payment_method ?? undefined, // Update payment_method if provided
        payment_status: data.payment_status ?? undefined, // Update payment_status if provided
        shipment: data.shipment
          ? {
              connect: { shipment_id: data.shipment.connect?.shipment_id }, // Use 'connect' to link the shipment
            }
          : undefined,
      },
    });
  }

  async deletePayment(payment_id: number): Promise<payment> {
    return this.prisma.payment.delete({
      where: { payment_id: Number(payment_id) },
    });
  }

  async getPaymentsWithinDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<payment[]> {
    try {
      return this.prisma.payment.findMany({
        where: {
          created_at: {
            gte: startDate,
            lt: endDate,
          },
        },
      });
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw new Error('Could not fetch payments');
    }
  }
}
