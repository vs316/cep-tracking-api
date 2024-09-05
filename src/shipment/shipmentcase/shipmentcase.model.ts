import { Prisma } from '@prisma/client';

export class shipmentcase implements Prisma.shipmentcaseCreateInput {
  case_id?: number; // Optional, if auto-incremented
  user_id?: number | null; // Optional, since it's nullable
  shipment_id?: number | null; // Optional, since it's nullable
  case_status?: string | null; // Optional, since it's nullable
  created_at?: Date | string; // Optional, has a default value in the schema
  updated_at?: Date | string; // Optional, since it's nullable
  user?: Prisma.userCreateNestedOneWithoutShipmentcaseInput; // Optional nested input
  shipment?: Prisma.shipmentCreateNestedOneWithoutShipmentcaseInput; // Optional nested input
}
