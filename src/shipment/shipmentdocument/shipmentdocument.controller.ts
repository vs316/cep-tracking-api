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
import { shipmentdocument } from './shipmentdocument.model';
import { shipmentdocumentService } from './shipmentdocument.service';
import { Request, Response } from 'express';

@Controller('shipment-documents')
export class shipmentdocumentController {
  constructor(
    private readonly shipmentdocumentService: shipmentdocumentService,
  ) {}

  @Get()
  async getAllShipmentDocuments(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result =
        await this.shipmentdocumentService.getAllShipmentDocuments();
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
  async postShipmentDocument(
    @Body() postData: shipmentdocument,
    @Res() response: Response, // Add this line
  ): Promise<Response> {
    try {
      const createdNotification =
        await this.shipmentdocumentService.createShipmentDocument(postData);
      return response.status(HttpStatus.CREATED).json(createdNotification);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to create notification',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':document_id')
  async getShipmentDocument(
    @Param('document_id') document_id: number,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const notification =
        await this.shipmentdocumentService.getShipmentDocument(document_id);
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

  @Delete(':document_id')
  async deleteShipmentDocument(
    @Param('document_id') document_id: number,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      await this.shipmentdocumentService.deleteShipmentDocument(document_id);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete notification',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':document_id')
  async updateShipmentDocument(
    @Param('document_id') document_id: number,
    @Body() data: shipmentdocument,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const updatedNotification =
        await this.shipmentdocumentService.updateShipmentDocument(
          document_id,
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
