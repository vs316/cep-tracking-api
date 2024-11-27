 
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { couriers } from './courier.model';

@Injectable()
export class CourierService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCouriers(): Promise<couriers[]> {
    return this.prisma.couriers.findMany();
  }

  async getCourier(courier_id: number): Promise<couriers> {
    return this.prisma.couriers.findUnique({
      where: { courier_id: Number(courier_id) },
    });
  }
  async getCourierById(courierId: number): Promise<couriers> {
    return this.prisma.couriers.findUnique({
      where: { courier_id: Number(courierId) },
    });
  }
  async createCourier(
    CourierData: couriers,
    // addresses: address[],
  ): Promise<couriers> {
    // First, create the user
    const Courier = await this.prisma.couriers.create({
      data: {
        name: CourierData.name,
        phone_number: CourierData.phone_number,
        vehicle_id: CourierData.vehicle_id,
        status: CourierData.status,
        rating: CourierData.rating,
        email: CourierData.email,
        gender: CourierData.gender,
      },
    });
    return Courier;
  }

  async updateCourier(Courier_id: number, data: couriers): Promise<couriers> {
    return this.prisma.couriers.update({
      where: { courier_id: Number(Courier_id) },
      data: {
        name: data.name,
        phone_number: data.phone_number,
        email: data.email,
        vehicle_id: data.vehicle_id,
        status: data.status,
        rating: data.rating,
      },
    });
  }

  async deleteCourier(Courier_id: number): Promise<couriers> {
    return this.prisma.couriers.delete({
      where: { courier_id: Number(Courier_id) },
    });
  }
}
