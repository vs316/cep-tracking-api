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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { shipmentcase } from './shipmentcase.model';
import { shipmentcaseService } from './shipmentcase.service';
import { Request, Response } from 'express';

@Controller('shipment-cases')
export class shipmentcaseController {
  constructor(private readonly shipmentcaseService: shipmentcaseService) {}

  @Get()
  async getAllShipmentCases(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = await this.shipmentcaseService.getAllShipmentCases();
      return response.status(HttpStatus.OK).json({
        status: 'Ok!',
        message: 'Successfully fetched data!',
        result: result,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async postShipmentCase(
    @Body() postData: shipmentcase,
    @Res() response: Response, // Add this line
  ): Promise<Response> {
    try {
      const createdNotification =
        await this.shipmentcaseService.createShipmentCase(postData);
      return response.status(HttpStatus.CREATED).json(createdNotification);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to create notification',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':case_id')
  async getShipmentCase(
    @Param('case_id') case_id: number,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const notification =
        await this.shipmentcaseService.getShipmentCase(case_id);
      if (!notification) {
        throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
      }
      return response.status(HttpStatus.OK).json(notification);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch notification',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':case_id')
  async deleteShipmentCase(
    @Param('document_id') case_id: number,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      await this.shipmentcaseService.deleteShipmentCase(case_id);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete notification',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':case_id')
  async updateShipmentCase(
    @Param('case_id') case_id: number,
    @Body() data: shipmentcase,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const updatedNotification =
        await this.shipmentcaseService.updateShipmentCase(case_id, data);
      if (!updatedNotification) {
        throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
      }
      return response.status(HttpStatus.OK).json(updatedNotification);
    } catch (error) {
      console.error(error); // Log the error
      throw new HttpException(
        'Failed to update notification',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
