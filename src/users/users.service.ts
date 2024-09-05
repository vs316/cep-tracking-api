/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { user } from './user.model';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers(): Promise<user[]> {
    return this.prisma.user.findMany();
  }
  async getUser(user_id: number): Promise<user | null> {
    return this.prisma.user.findUnique({ where: { user_id: Number(user_id) } });
  }
  async createUser(data: user): Promise<user> {
    return this.prisma.user.create({
      data,
    });
  }
  async updateUser(user_id: number, data: user): Promise<user> {
    return this.prisma.user.update({
      where: { user_id: Number(user_id) },
      data: {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
      },
    });
  }

  async deleteUser(user_id: number): Promise<user> {
    return this.prisma.user.delete({
      where: { user_id: Number(user_id) },
    });
  }
}
