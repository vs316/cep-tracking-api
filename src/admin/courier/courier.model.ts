import { $Enums, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
export class couriers implements Prisma.couriersCreateInput {
  courier_id?: number;
  name?: string;
  vehicle_id?: string;
  phone_number?: string;
  rating?: Decimal;
  status?: $Enums.couriers_status;
  gender?: $Enums.couriers_gender;
  email?: string;
}
