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
import { shipment } from './shipment.model';
import { ShipmentService } from './shipment.service';
import { Request, Response } from 'express';

@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get()
  async getAllShipments(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.shipmentService.getAllShipments();
    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched data!',
      result: result,
    });
  }
  @Post()
  async postShipment(@Body() postData: shipment): Promise<shipment> {
    return this.shipmentService.createShipment(postData);
  }

  @Get(':shipment_id')
  async getShipment(
    @Param('shipment_id') shipment_id: number,
  ): Promise<shipment | null> {
    return this.shipmentService.getShipment(shipment_id);
  }

  @Delete(':shipment_id')
  async deleteShipment(
    @Param('shipment_id') shipment_id: number,
  ): Promise<shipment> {
    return this.shipmentService.deleteShipment(shipment_id);
  }

  @Put(':shipment_id')
  async updateShipment(
    @Param('shipment_id') shipment_id: number,
    @Body() data: shipment,
  ): Promise<shipment> {
    return this.shipmentService.updateShipment(shipment_id, data);
  }
}
