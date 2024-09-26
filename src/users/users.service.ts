/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { user } from './user.model';
//import { address } from '../address/address.model'; // Import the address model

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<user[]> {
    return this.prisma.user.findMany();
  }

  async getUser(uuid: string): Promise<user> {
    return this.prisma.user.findUnique({ where: { uuid: uuid } });
  }
  async getUserById(userId: number): Promise<user> {
    return this.prisma.user.findUnique({ where: { user_id: userId } });
  }

  async createUserWithAddresses(
    userData: user,
    // addresses: address[],
  ): Promise<user> {
    // First, create the user
    const user = await this.prisma.user.create({
      data: {
        first_name: userData.first_name, // Ensure first_name is passed
        last_name: userData.last_name, // Include other required fields
        email: userData.email,
        phone_number: userData.phone_number,
        password: userData.password,
        uuid: userData.uuid,
      },
    });

    // Then, create the addresses and link them to the user
    // const addressPromises = addresses.map((address) =>
    //   this.prisma.address.create({
    //     data: {
    //       address_line_1: address.address_line_1,
    //       address_line_2: address.address_line_2,
    //       locality: address.locality,
    //       city: address.city,
    //       state: address.state,
    //       pincode: address.pincode,
    //       userId: user.user_id, // Use the created user's ID
    //     },
    //   }),
    // );

    // await Promise.all(addressPromises);
    return user;
  }

  async updateUser(user_id: number, data: user): Promise<user> {
    return this.prisma.user.update({
      where: { user_id: Number(user_id) },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        password: data.password,
      },
    });
  }

  async deleteUser(user_id: number): Promise<user> {
    return this.prisma.user.delete({
      where: { user_id: Number(user_id) },
    });
  }
}
