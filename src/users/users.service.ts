/* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { UserDto } from './dto/user.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User, Shipment } from './entities/user.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User) private readonly userRepository: Repository<User>,
//     @InjectRepository(Shipment)
//     private readonly shipmentRepository: Repository<Shipment>, // Inject Shipment repository
//   ) {}

//   async create(userDto: UserDto) {
//     const user = this.userRepository.create(userDto);
//     return await this.userRepository.save(user);
//   }

//   findMany() {
//     return this.userRepository.find();
//   }

//   async update(user_id: number, userDto: UserDto) {
//     const user = await this.userRepository.findOne({ where: { user_id } });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     Object.assign(user, userDto);
//     return await this.userRepository.save(user);
//   }

//   async delete(user_id: number) {
//     const user = await this.userRepository.findOne({ where: { user_id } });
//     // check if record exists
//     return await this.userRepository.remove(user);
//   }

// }
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma.service';
// import { user, Prisma } from '@prisma/client';

// @Injectable()
// export class UserService {
//   constructor(private prisma: PrismaService) {}

//   async user(
//     userWhereUniqueInput: Prisma.userWhereUniqueInput,
//   ): Promise<user | null> {
//     return this.prisma.user.findUnique({
//       where: userWhereUniqueInput,
//     });
//   }

//   async users(params: {
//     skip?: number;
//     take?: number;
//     cursor?: Prisma.userWhereUniqueInput;
//     where?: Prisma.userWhereInput;
//     orderBy?: Prisma.userOrderByWithRelationInput;
//   }): Promise<user[]> {
//     const { skip, take, cursor, where, orderBy } = params;
//     return this.prisma.user.findMany({
//       skip,
//       take,
//       cursor,
//       where,
//       orderBy,
//     });
//   }

//   async createUser(data: Prisma.userCreateInput): Promise<user> {
//     return this.prisma.user.create({
//       data,
//     });
//   }

//   async updateUser(params: {
//     where: Prisma.userWhereUniqueInput;
//     data: Prisma.userUpdateInput;
//   }): Promise<user> {
//     const { where, data } = params;
//     return this.prisma.user.update({
//       data,
//       where,
//     });
//   }

//   async deleteUser(where: Prisma.userWhereUniqueInput): Promise<user> {
//     return this.prisma.user.delete({
//       where,
//     });
//   }
// }
