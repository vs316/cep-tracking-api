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
import { CourierService } from './courier.service';
import { Request, Response } from 'express';
import { Courier } from './courier.model';
import { $Enums } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
@Controller('courier')
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
      status: $Enums.CourierStatus;
    },
  ): Promise<Courier> {
    console.log(postData);
    if (
      !postData.name ||
      !postData.vehicle_id ||
      !postData.phone_number ||
      !postData.rating ||
      !postData.status
    ) {
      throw new BadRequestException('Courier data is required.');
    }
    const createdCourier = await this.CourierService.createCourier({
      name: postData.name,
      vehicle_id: postData.vehicle_id,
      phone_number: postData.phone_number,
      rating: postData.rating,
      status: postData.status,
    });
    return createdCourier;
  }

  @Get(':uuid')
  async getCourier(@Param('courier_id') CourierId: number): Promise<Courier> {
    return this.CourierService.getCourier(CourierId);
  }

  @Get(':Courier_id')
  async getCourierById(
    @Param('Courier_id') CourierId: number,
  ): Promise<Courier> {
    return this.CourierService.getCourierById(CourierId);
  }

  @Delete(':Courier_id')
  async deleteCourier(
    @Param('Courier_id') Courier_id: number,
  ): Promise<Courier> {
    return this.CourierService.deleteCourier(Courier_id);
  }

  @Put(':Courier_id')
  async updateCourier(
    @Param('Courier_id') Courier_id: number,
    @Body() data: Courier,
  ): Promise<Courier> {
    return this.CourierService.updateCourier(Courier_id, data);
  }
}
