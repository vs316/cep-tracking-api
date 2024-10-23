/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { user } from './user.model';
//import { address } from '../address/address.model'; // Import the address model
// Helper function to convert to IST
const convertToIST = (date: Date): Date => {
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istDate = new Date(date.getTime() + istOffset);
  return istDate;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async getNewCustomers(startDate: Date, endDate: Date): Promise<user[]> {
    // This method should interact with your database to fetch new customers based on created_at
    return this.prisma.user.findMany({
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }

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
    // Get current date and time in UTC
    const currentDate = new Date();

    // Convert the current date to IST
    const createdAtIST = convertToIST(currentDate);
    const updatedAtIST = convertToIST(currentDate);
    const user = await this.prisma.user.create({
      data: {
        first_name: userData.first_name, // Ensure first_name is passed
        last_name: userData.last_name, // Include other required fields
        email: userData.email,
        phone_number: userData.phone_number,
        password: userData.password,
        uuid: userData.uuid,
        created_at: createdAtIST, // Save IST date
        updated_at: updatedAtIST, // Save IST date
      },
    });

    return user;

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
