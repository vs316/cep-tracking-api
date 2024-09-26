import { Prisma } from '@prisma/client';
export class address implements Omit<Prisma.addressCreateInput, 'user'> {
  // Omitted user property
  address_id?: number;
  address_line_1: string;
  address_line_2?: string;
  locality?: string;
  city?: string;
  state?: string;
  pincode?: string;
  uuid: string;
  //user?: Prisma.userCreateNestedOneWithoutAddressesInput; // Removed user property
}
