import { Prisma } from '@prisma/client';

export class Admin implements Prisma.adminCreateInput {
  admin_id?: number;
  uuid: string;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}
