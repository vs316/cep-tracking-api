/* eslint-disable prettier/prettier */
import {
  BadRequestException,
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
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { user } from './user.model';
import { address } from '../address/address.model'; // Import the address model
import { AddressService } from 'src/address/address.service';
import dayjs from 'dayjs';
@Controller('user')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly addressService: AddressService,
  ) {}

  @Get() async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    this.logger.log('Fetching all users...');
    try {
      const result = await this.usersService.getAllUsers();
      return response
        .status(200)
        .json({
          status: 'Ok!',
          message: 'Successfully fetched data!',
          result: result,
        });
    } catch (error) {
      this.logger.error('Failed to fetch users', error);
      return response
        .status(500)
        .json({
          status: 'Error',
          message: 'Failed to fetch data',
          error: (error as Error).message,
        });
    }
  }

  @Get('new-customers')
  async getNewCustomers(
    @Query('start') start: string,
    @Query('end') end: string,
    @Res() response: Response,
  ): Promise<any> {
    const startDate = dayjs(start).toDate();
    const endDate = dayjs(end).toDate();

    // Fetch payments within the date range
    const newcustomers = await this.usersService.getNewCustomers(
      startDate,
      endDate,
    );

    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched data!',
      data: newcustomers,
    });
  }
  // Helper function to parse date in YYYY-MM-DD format
  private parseDateString(dateString: string): Date | null {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Expecting YYYY-MM-DD format

    if (!dateRegex.test(dateString)) {
      return null;
    }

    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return null;
    }

    return date;
  }

  @Post()
  async postUser(
    @Body()
    postData: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      password: string;
      addresses: address[];
      uuid: string;
    },
  ): Promise<user> {
    console.log(postData);
    if (
      !postData.first_name ||
      !postData.last_name ||
      !postData.email ||
      !postData.phone_number ||
      !postData.password ||
      !postData.uuid
    ) {
      throw new BadRequestException('User data is required.');
    }

    const createdUser = await this.usersService.createUserWithAddresses({
      first_name: postData.first_name,
      last_name: postData.last_name,
      email: postData.email,
      phone_number: postData.phone_number,
      password: postData.password,
      uuid: postData.uuid,
    });

    // If addresses are provided, create them
    if (postData.addresses && postData.addresses.length > 0) {
      const addressData = postData.addresses.map((addr) => ({
        // Set to 0 or omit if auto-incremented
        address_line_1: addr.address_line_1,
        address_line_2: addr.address_line_2,
        locality: addr.locality,
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
        uuid: createdUser.uuid, // Link the address to the created user
      }));

      await this.addressService.createAddressesForUser(
        addressData,
        createdUser.uuid,
      );
    }

    return createdUser;
  }

  @Get(':uuid')
  async getUser(@Param('uuid') uuid: string): Promise<user> {
    return this.usersService.getUser(uuid);
  }

  @Get(':user_id')
  async getUserById(@Param('user_id') userId: number): Promise<user> {
    return this.usersService.getUserById(userId);
  }
  @Get('id/:uuid')
  async getUserIdByUuid(
    @Param('uuid') uuid: string,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const user = await this.usersService.getUserIdByUuid(uuid);
      if (!user) {
        return response.status(404).json({
          status: 'Error',
          message: 'User not found',
        });
      }
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetched user ID',
        user_id: user.user_id,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'Error',
        message: 'Failed to fetch user ID',
        error: (error as Error).message,
      });
    }
  }

  @Delete(':user_id')
  async deleteUser(@Param('user_id') user_id: number): Promise<user> {
    return this.usersService.deleteUser(user_id);
  }

  @Put(':user_id')
  async updateUser(
    @Param('user_id') user_id: number,
    @Body() data: user,
  ): Promise<user> {
    return this.usersService.updateUser(user_id, data);
  }
}
