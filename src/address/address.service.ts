import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { address } from './address.model';
@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  async getAllAddresses(): Promise<address[]> {
    return this.prisma.address.findMany();
  }
  async getAddress(address_id: number): Promise<address | null> {
    return this.prisma.address.findUnique({
      where: { address_id: Number(address_id) },
    });
  }
  async createAddress(data: address): Promise<address> {
    return this.prisma.address.create({
      data,
    });
  }
  async updateAddress(address_id: number, data: address): Promise<address> {
    return this.prisma.address.update({
      where: { address_id: Number(address_id) },
      data: {
        address_line_1: data.address_line_1,
        address_line_2: data.address_line_2,
        locality: data.locality,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      },
    });
  }

  async deleteAddress(address_id: number): Promise<address> {
    return this.prisma.address.delete({
      where: { address_id: Number(address_id) },
    });
  }
}
