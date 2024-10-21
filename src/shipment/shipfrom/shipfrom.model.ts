import { Prisma } from '@prisma/client';

export class shipfrom implements Prisma.shipfromCreateInput {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  pincode?: string | null;
  city?: string | null;
  locality?: string | null;
  address_line_2?: string | null;
  address_line_1?: string | null;

  shipment?: Prisma.shipmentCreateNestedManyWithoutShipfromInput; // Represents the relation to multiple shipments
}
