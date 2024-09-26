/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { shipfrom } from './shipfrom.model';
//import { address } from '../address/address.model'; // Import the address model

@Injectable()
export class ShipFromService {
  constructor(private prisma: PrismaService) {}
  async getAllShipFromDetails(): Promise<shipfrom[]> {
    const shipfromdata = await this.prisma.shipfrom.findMany();
    return shipfromdata.map((shipfrom) => ({
      ...shipfrom,
    }));
  }
  async getShipFromDetails(shipfromId: number): Promise<shipfrom | null> {
    return this.prisma.shipfrom.findUnique({
      where: { shipfrom_id: Number(shipfromId) },
    });
  }

  async createShipFromDetails(shipFromData: shipfrom): Promise<shipfrom> {
    const shipFromDetails = await this.prisma.shipfrom.create({
      data: {
        first_name: shipFromData.first_name, // Ensure first_name is passed
        last_name: shipFromData.last_name, // Include other required fields
        email: shipFromData.email,
        phone_number: shipFromData.phone_number,
        address_line_1: shipFromData.address_line_1,
        address_line_2: shipFromData.address_line_2,
        locality: shipFromData.locality,
        pincode: shipFromData.pincode,
        city: shipFromData.city,
      },
    });
    return shipFromDetails;
  }
}
