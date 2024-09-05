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
import { payment } from './payment.model';
import { PaymentService } from './payment.service';
import { Request, Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async getAllPayments(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.paymentService.getAllPayments();
    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched data!',
      result: result,
    });
  }
  @Post()
  async postPayment(@Body() postData: payment): Promise<payment> {
    return this.paymentService.createPayment(postData);
  }

  @Get(':payment_id')
  async getPayment(
    @Param('payment_id') payment_id: number,
  ): Promise<payment | null> {
    return this.paymentService.getPayment(payment_id);
  }

  @Delete(':payment_id')
  async deletePayment(
    @Param('payment_id') payment_id: number,
  ): Promise<payment> {
    return this.paymentService.deletePayment(payment_id);
  }

  @Put(':payment_id')
  async updatePayment(
    @Param('payment_id') payment_id: number,
    @Body() data: payment,
  ): Promise<payment> {
    return this.paymentService.updatePayment(payment_id, data);
  }
}
