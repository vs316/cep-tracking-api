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
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { user } from './user.model';
import { address } from '../address/address.model'; // Import the address model
import { AddressService } from 'src/address/address.service';
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly addressService: AddressService,
  ) {}

  @Get()
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.usersService.getAllUsers();
    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetched data!',
      result: result,
    });
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
