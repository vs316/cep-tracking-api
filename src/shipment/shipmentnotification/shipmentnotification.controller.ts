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
import { ShipmentNotification } from './shipmentnotification.model';
import { ShipmentNotificationService } from './shipmentnotification.service';
import { Request, Response } from 'express';

@Controller('shipment-notifications')
export class ShipmentNotificationController {
  constructor(
    private readonly shipmentNotificationService: ShipmentNotificationService,
  ) {}

  @Get()
  async getAllShipmentNotifications(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result =
        await this.shipmentNotificationService.getAllShipmentNotifications();
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
  async postShipmentNotification(
    @Body() postData: ShipmentNotification,
    @Res() response: Response, // Add this line
  ): Promise<Response> {
    try {
      const createdNotification =
        await this.shipmentNotificationService.createShipmentNotification(
          postData,
        );
      return response.status(HttpStatus.CREATED).json(createdNotification);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to create notification',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':notification_id')
  async getShipmentNotification(
    @Param('notification_id') notification_id: number,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const notification =
        await this.shipmentNotificationService.getShipmentNotification(
          notification_id,
        );
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

  @Delete(':notification_id')
  async deleteShipmentNotification(
    @Param('notification_id') notification_id: number,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      await this.shipmentNotificationService.deleteShipmentNotification(
        notification_id,
      );
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete notification',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':notification_id')
  async updateShipmentNotification(
    @Param('notification_id') notification_id: number,
    @Body() data: ShipmentNotification,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const updatedNotification =
        await this.shipmentNotificationService.updateShipmentNotification(
          notification_id,
          data,
        );
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
