 
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
import { shipmentitem } from './shipmentitem.model';
import { ShipmentItemService } from './shipmentitem.service';
import { Request, Response } from 'express';

@Controller('shipment-items')
export class ShipmentItemController {
  constructor(private readonly shipmentitemService: ShipmentItemService) {}

  @Get()
  async getAllShipmentItems(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.shipmentitemService.getAllShipmentItems();
    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched data!',
      result: result,
    });
  }
  @Post()
  async postShipmentItem(
    @Body() postData: shipmentitem,
  ): Promise<shipmentitem> {
    return this.shipmentitemService.createShipmentItem(postData);
  }

  @Get(':shipment_item_id')
  async getShipmentItem(
    @Param('shipment_item_id') shipment_item_id: number,
  ): Promise<shipmentitem | null> {
    return this.shipmentitemService.getShipmentItem(shipment_item_id);
  }

  @Delete(':shipment_item_id')
  async deleteShipmentItem(
    @Param('shipment_item_id') shipment_item_id: number,
  ): Promise<shipmentitem> {
    return this.shipmentitemService.deleteShipmentItem(shipment_item_id);
  }

  @Put(':shipment_item_id')
  async updateShipmentItem(
    @Param('shipment_item_id') shipment_item_id: number,
    @Body() data: shipmentitem,
  ): Promise<shipmentitem> {
    return this.shipmentitemService.updateShipmentItem(shipment_item_id, data);
  }
}
