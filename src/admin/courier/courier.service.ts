/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Courier } from './courier.model';

@Injectable()
export class CourierService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCouriers(): Promise<Courier[]> {
    return this.prisma.courier.findMany();
  }

  async getCourier(courier_id: number): Promise<Courier> {
    return this.prisma.courier.findUnique({
      where: { courier_id: courier_id },
    });
  }
  async getCourierById(CourierId: number): Promise<Courier> {
    return this.prisma.courier.findUnique({ where: { courier_id: CourierId } });
  }
  async createCourier(
    CourierData: Courier,
    // addresses: address[],
  ): Promise<Courier> {
    // First, create the user
    const Courier = await this.prisma.courier.create({
      data: {
        name: CourierData.name,
        phone_number: CourierData.phone_number,
        vehicle_id: CourierData.vehicle_id,
        status: CourierData.status,
        rating: CourierData.rating,
      },
    });
    return Courier;
  }

  async updateCourier(Courier_id: number, data: Courier): Promise<Courier> {
    return this.prisma.courier.update({
      where: { courier_id: Number(Courier_id) },
      data: {
        name: data.name,
        phone_number: data.phone_number,
        vehicle_id: data.vehicle_id,
        status: data.status,
        rating: data.rating,
      },
    });
  }

  async deleteCourier(Courier_id: number): Promise<Courier> {
    return this.prisma.courier.delete({
      where: { courier_id: Number(Courier_id) },
    });
  }
}
