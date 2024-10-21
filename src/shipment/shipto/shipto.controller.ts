/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ShipToService } from './shipto.service';
import { shipto } from './shipto.model';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
@Controller('shipto')
export class ShipToController {
  constructor(private readonly ShipToService: ShipToService) {}

  @Post()
  async postShipToDetails(
    @Body()
    postData: {
      company: string;
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
  ): Promise<shipto> {
    console.log(postData);
    if (
      !postData.company ||
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
      throw new BadRequestException('ShipTo data is required.');
    }

    const createdShipTo = await this.ShipToService.createShipToDetails({
      company: postData.company,
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

    return createdShipTo;
  }
  @Get()
  async getAllShipToData(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.ShipToService.getAllShipToDetails();
    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched data!',
      result: result,
    });
  }
  @Get(':shipto_id')
  async getShipToDataById(
    @Param('shipto_id') shipto_id: number,
  ): Promise<shipto | null> {
    return this.ShipToService.getShipToDetails(shipto_id);
  }
}
