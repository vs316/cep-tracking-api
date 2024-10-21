/* eslint-disable prettier/prettier */
import {
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
import { CourierService } from './courier.service';
import { Request, Response } from 'express';
import { couriers } from './courier.model';
import { $Enums } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
@Controller('couriers')
export class CourierController {
  constructor(private readonly CourierService: CourierService) {}

  @Get()
  async getAllCouriers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.CourierService.getAllCouriers();
    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched data!',
      result: result,
    });
  }

  @Post()
  async postCourier(
    @Body()
    postData: {
      name: string;
      vehicle_id: string;
      phone_number: string;
      rating: Decimal;
      status?: $Enums.couriers_status;
      email: string;
    },
  ): Promise<couriers> {
    console.log(postData);
    const createdCourier = await this.CourierService.createCourier({
      name: postData.name,
      vehicle_id: postData.vehicle_id,
      phone_number: postData.phone_number,
      rating: postData.rating,
      status: postData.status,
      email: postData.email,
    });
    return createdCourier;
  }

  @Get(':courier_id')
  async getCourier(@Param('courier_id') CourierId: number): Promise<couriers> {
    return this.CourierService.getCourier(CourierId);
  }

  @Get(':courier_id')
  async getCourierById(
    @Param('courier_id') CourierId: number,
  ): Promise<couriers> {
    return this.CourierService.getCourierById(CourierId);
  }

  @Delete(':courier_id')
  async deleteCourier(
    @Param('courier_id') Courier_id: number,
  ): Promise<couriers> {
    return this.CourierService.deleteCourier(Courier_id);
  }

  @Put(':courier_id')
  async updateCourier(
    @Param('courier_id') Courier_id: number,
    @Body() data: couriers,
  ): Promise<couriers> {
    return this.CourierService.updateCourier(Courier_id, data);
  }
}
