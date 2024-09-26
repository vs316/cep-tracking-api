import { Prisma } from '@prisma/client';

export class shipto implements Prisma.shiptoCreateInput {
  company: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  pincode: string;
  city: string;
  locality: string;
  address_line_2: string;
  address_line_1: string;
}
