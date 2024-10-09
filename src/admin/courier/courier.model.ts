import { $Enums, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
export class Courier implements Prisma.CourierCreateInput {
  courier_id?: number;
  name: string;
  vehicle_id: string;
  phone_number: string;
  rating: Decimal;
  status: $Enums.CourierStatus;
}
