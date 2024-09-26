/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { shipto } from './shipto.model';
//import { address } from '../address/address.model'; // Import the address model

@Injectable()
export class ShipToService {
  constructor(private prisma: PrismaService) {}
  async getAllShipToDetails(): Promise<shipto[]> {
    const shiptodata = await this.prisma.shipto.findMany();
    return shiptodata.map((shipto) => ({
      ...shipto,
    }));
  }
  async getShipToDetails(shiptoId: number): Promise<shipto | null> {
    return this.prisma.shipto.findUnique({
      where: { shipto_id: Number(shiptoId) },
    });
  }

  async createShipToDetails(shiptoData: shipto): Promise<shipto> {
    const shiptoDetails = await this.prisma.shipto.create({
      data: {
        company: shiptoData.company,
        first_name: shiptoData.first_name, // Ensure first_name is passed
        last_name: shiptoData.last_name, // Include other required fields
        email: shiptoData.email,
        phone_number: shiptoData.phone_number,
        address_line_1: shiptoData.address_line_1,
        address_line_2: shiptoData.address_line_2,
        locality: shiptoData.locality,
        pincode: shiptoData.pincode,
        city: shiptoData.city,
      },
    });
    return shiptoDetails;
  }
}
