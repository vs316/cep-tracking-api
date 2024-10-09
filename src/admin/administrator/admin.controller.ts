/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request, Response } from 'express';
import { Admin } from './admin.model';
@Controller('admin')
export class AdminController {
  constructor(private readonly AdminService: AdminService) {}

  @Get()
  async getAllAdmins(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.AdminService.getAllAdmins();
    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched data!',
      result: result,
    });
  }

  @Post()
  async postAdmin(
    @Body()
    postData: {
      username: string;
      email: string;
      password: string;
      uuid: string;
    },
  ): Promise<Admin> {
    console.log(postData);
    if (
      !postData.username ||
      !postData.email ||
      !postData.password ||
      !postData.uuid
    ) {
      throw new BadRequestException('Admin data is required.');
    }
    const createdAdmin = await this.AdminService.createAdmin({
      username: postData.username,
      email: postData.email,
      password: postData.password,
      uuid: postData.uuid,
    });
    return createdAdmin;
  }

  @Get(':uuid')
  async getAdmin(@Param('uuid') uuid: string): Promise<Admin> {
    return this.AdminService.getAdmin(uuid);
  }

  @Get(':admin_id')
  async getAdminById(@Param('admin_id') adminId: number): Promise<Admin> {
    return this.AdminService.getAdminById(adminId);
  }

  @Delete(':admin_id')
  async deleteAdmin(@Param('admin_id') admin_id: number): Promise<Admin> {
    return this.AdminService.deleteAdmin(admin_id);
  }

  @Put(':admin_id')
  async updateAdmin(
    @Param('admin_id') admin_id: number,
    @Body() data: Admin,
  ): Promise<Admin> {
    return this.AdminService.updateAdmin(admin_id, data);
  }
}
