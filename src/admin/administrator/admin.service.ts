 
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Admin } from './admin.model';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllAdmins(): Promise<Admin[]> {
    return this.prisma.admin.findMany();
  }

  async getAdmin(uuid: string): Promise<Admin> {
    return this.prisma.admin.findUnique({ where: { uuid: uuid } });
  }
  async getAdminById(AdminId: number): Promise<Admin> {
    return this.prisma.admin.findUnique({ where: { admin_id: AdminId } });
  }
  async createAdmin(
    AdminData: Admin,
    // addresses: address[],
  ): Promise<Admin> {
    // First, create the user
    const Admin = await this.prisma.admin.create({
      data: {
        username: AdminData.username,
        email: AdminData.email,
        password: AdminData.password,
        uuid: AdminData.uuid,
      },
    });
    return Admin;
  }

  async updateAdmin(admin_id: number, data: Admin): Promise<Admin> {
    return this.prisma.admin.update({
      where: { admin_id: Number(admin_id) },
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
  }

  async deleteAdmin(admin_id: number): Promise<Admin> {
    return this.prisma.admin.delete({
      where: { admin_id: Number(admin_id) },
    });
  }
}
