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
import { shipmentservice } from './shipmentservice.model';
import { ShipmentServiceService } from './shipmentservice.service';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Controller('shipment-services')
export class ShipmentServiceController {
  constructor(
    private readonly shipmentserviceService: ShipmentServiceService,
  ) {}

  @Get()
  async getAllShipmentServices(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.shipmentserviceService.getAllShipmentServices();
    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched data!',
      result: result,
    });
  }

  @Post()
  async postShipmentService(
    @Body() postData: shipmentservice,
  ): Promise<shipmentservice> {
    // Convert postData to Prisma.shipmentserviceCreateInput type
    const data: Prisma.shipmentserviceCreateInput = {
      service_id: postData.service_id,
      service_name: postData.service_name,
      service_description: postData.service_description,
      service_price: postData.service_price,
      service_status: postData.service_status,
      created_at: postData.created_at,
      updated_at: postData.updated_at,
      shipment: postData.shipment ? postData.shipment : undefined, // Conditionally include the shipment field
    };

    return this.shipmentserviceService.createShipmentService(data);
  }

  @Get(':shipment_item_id')
  async getShipmentService(
    @Param('shipment_item_id') shipment_item_id: number,
  ): Promise<shipmentservice | null> {
    return this.shipmentserviceService.getShipmentService(shipment_item_id);
  }

  @Delete(':shipment_item_id')
  async deleteShipmentService(
    @Param('shipment_item_id') shipment_item_id: number,
  ): Promise<shipmentservice> {
    return this.shipmentserviceService.deleteShipmentService(shipment_item_id);
  }

  @Put(':shipment_item_id')
  async updateShipmentService(
    @Param('shipment_item_id') shipment_item_id: number,
    @Body() data: shipmentservice,
  ): Promise<shipmentservice> {
    return this.shipmentserviceService.updateShipmentService(
      shipment_item_id,
      data,
    );
  }
}
