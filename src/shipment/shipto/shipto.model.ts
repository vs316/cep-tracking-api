import { Prisma } from '@prisma/client';

export class shipto implements Prisma.shiptoCreateInput {
  company?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  pincode?: string | null;
  city?: string | null;
  locality?: string | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  shipment?: Prisma.shipmentCreateNestedManyWithoutShiptoInput; // Represents the relation to multiple shipments
}
