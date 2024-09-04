/* eslint-disable prettier/prettier */
// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Delete,
//   Put,
// } from '@nestjs/common';
// import { usersService } from './users.service';
// import { UserDto } from './dto/user.dto';
// // import { ShipmentDto } from './dto/shipment.dto'; // Import ShipmentDto
// // import { Shipment } from './entities/shipment.entity';
// @Controller('user')
// export class UsersController {
//   constructor(private readonly usersService: usersService) {}

//   @Post()
//   create(@Body() createUserDto: UserDto) {
//     return this.usersService.create(createUserDto);
//   }

//   @Get()
//   findMany() {
//     return this.usersService.findMany();
//   }

//   @Put(':user_id')
//   update(@Param('user_id') user_id: number, @Body() userDTO: UserDto) {
//     return this.usersService.update(user_id, userDTO);
//   }

//   @Delete(':user_id')
//   delete(@Param('user_id') user_id: number) {
//     return this.usersService.delete(user_id);
//   }
// }
