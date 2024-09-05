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
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { user } from './user.model';
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  async postUser(@Body() postData: user): Promise<user> {
    return this.usersService.createUser(postData);
  }

  @Get(':user_id')
  async getUser(@Param('user_id') user_id: number): Promise<user | null> {
    return this.usersService.getUser(user_id);
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
