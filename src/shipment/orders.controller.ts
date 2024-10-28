/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Query } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  async getMockOrders(
    @Query('_end') end?: number,
    @Query('_start') start?: number,
    @Query('q') query?: string,
  ) {
    // Return a mock response, which could be an empty array or mock data.
    return {
      data: [], // or mock data if you want
      message: 'This is a mock response for orders endpoint',
      total: 0,
    };
  }
}
