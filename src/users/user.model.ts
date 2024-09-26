import { Prisma } from '@prisma/client';

export class user implements Prisma.userCreateInput {
  user_id?: number;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  shipment?: Prisma.shipmentCreateNestedManyWithoutUserInput;
  addresses?: Prisma.addressCreateNestedManyWithoutUserInput;
}
