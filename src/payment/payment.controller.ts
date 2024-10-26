/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { payment } from './payment.model';
import { PaymentService } from './payment.service';
import { Request, Response } from 'express';
import dayjs from 'dayjs';
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

  // @Get(':payment_id')
  // async getPayment(
  //   @Param('payment_id') payment_id: number,
  // ): Promise<payment | null> {
  //   return this.paymentService.getPayment(payment_id);
  // }

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
  @Get('dailyrevenue')
  async getPaymentsWithinDateRange(
    @Query('start') start: string,
    @Query('end') end: string,
    @Res() response: Response,
  ): Promise<any> {
    const startDate = dayjs(start).toDate();
    const endDate = dayjs(end).toDate();

    // Fetch payments within the date range
    const payments = await this.paymentService.getPaymentsWithinDateRange(
      startDate,
      endDate,
    );

    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched data!',
      data: payments,
    });
  }
  @Get('today')
  async getTodayOrders(@Res() response: Response): Promise<any> {
    try {
      const today = dayjs().startOf('day').toDate();
      const tomorrow = dayjs().endOf('day').toDate();

      console.log('Fetching orders from', today, 'to', tomorrow); // Debugging log

      const orders = await this.paymentService.getPaymentsWithinDateRange(
        today,
        tomorrow,
      );

      return response.status(200).json({
        status: 'Ok!',
        message: "Successfully fetched today's orders!",
        data: orders,
      });
    } catch (error) {
      console.error("Error fetching today's orders:", error);
      return response.status(500).json({
        status: 'Error',
        message: "Internal server error while fetching today's orders.",
      });
    }
  }
}
