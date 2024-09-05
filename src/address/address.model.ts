import { Prisma } from '@prisma/client';
export class address implements Prisma.addressCreateInput {
  address_id: number;
  address_line_1: string;
  address_line_2: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
}
