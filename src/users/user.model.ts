import { Prisma } from '@prisma/client';
export class user implements Prisma.userCreateInput {
  user_id: number;
  name: string;
  email: string;
  phone_number: string;
}
