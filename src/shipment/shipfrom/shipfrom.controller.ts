/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ShipFromService } from './shipfrom.service';
import { shipfrom } from './shipfrom.model';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
@Controller('shipfrom')
export class ShipFromController {
  constructor(private readonly ShipFromService: ShipFromService) {}

  @Post()
  async postShipFromDetails(
    @Body()
    postData: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      address_line_1: string;
      address_line_2: string;
      locality: string;
      city: string;
      pincode: string;
    },
  ): Promise<shipfrom> {
    console.log(postData);
    if (
      !postData.first_name ||
      !postData.last_name ||
      !postData.email ||
      !postData.phone_number ||
      !postData.address_line_1 ||
      !postData.address_line_2 ||
      !postData.locality ||
      !postData.city ||
      !postData.pincode
    ) {
      throw new BadRequestException('User data is required.');
    }

    const createdShipFrom = await this.ShipFromService.createShipFromDetails({
      first_name: postData.first_name,
      last_name: postData.last_name,
      email: postData.email,
      phone_number: postData.phone_number,
      address_line_1: postData.address_line_1,
      address_line_2: postData.address_line_2,
      locality: postData.locality,
      pincode: postData.pincode,
      city: postData.city,
    });

    return createdShipFrom;
  }
  @Get()
  async getAllShipFromData(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.ShipFromService.getAllShipFromDetails();
    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched data!',
      result: result,
    });
  }
  @Get(':shipfrom_id')
  async getShipFromDataById(
    @Param('shipfrom_id') shipfrom_id: number,
  ): Promise<shipfrom | null> {
    return this.ShipFromService.getShipFromDetails(shipfrom_id);
  }
}
