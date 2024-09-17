import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { address } from './address.model';
@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  async getAllAddresses(): Promise<address[]> {
    const addresses = await this.prisma.address.findMany();
    return addresses.map((addr) => ({
      ...addr,
      userId: addr.userId, // Ensure userId is included
    }));
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
  async createAddressesForUser(
    addresses: address[],
    userId: number,
  ): Promise<void> {
    const addressPromises = addresses.map((address) =>
      this.prisma.address.create({
        data: {
          address_line_1: address.address_line_1,
          address_line_2: address.address_line_2,
          locality: address.locality,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          userId: userId, // Link the address to the created user
        },
      }),
    );

    await Promise.all(addressPromises);
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
