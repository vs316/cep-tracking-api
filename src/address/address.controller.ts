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
import { address } from './address.model';
import { AddressService } from './address.service';
import { Request, Response } from 'express';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getAllAddresses(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.addressService.getAllAddresses();
    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched data!',
      result: result,
    });
  }
  @Post()
  async postAddress(@Body() postData: address): Promise<address> {
    return this.addressService.createAddress(postData);
  }

  @Get(':address_id')
  async getAddress(
    @Param('address_id') address_id: number,
  ): Promise<address | null> {
    return this.addressService.getAddress(address_id);
  }

  @Delete(':address_id')
  async deleteAddress(
    @Param('address_id') address_id: number,
  ): Promise<address> {
    return this.addressService.deleteAddress(address_id);
  }

  @Put(':address_id')
  async updateAddress(
    @Param('address_id') address_id: number,
    @Body() data: address,
  ): Promise<address> {
    return this.addressService.updateAddress(address_id, data);
  }
}
