import { Prisma } from '@prisma/client';

export class shipment implements Prisma.shipmentCreateInput {
  shipment_id?: number;
  user_id?: number;
  from_address_id?: number;
  to_address_id?: number;
  shipment_type?: string;
  status?: string;
  is_draft?: boolean;
  is_finalized?: boolean;
  created_at?: string | Date;
  updated_at?: string | Date;

  // Prisma relationship inputs for nested connections
  payment?: Prisma.paymentCreateNestedManyWithoutShipmentInput;
  user?: Prisma.userCreateNestedOneWithoutShipmentInput;

  // These will reference the address from 'shipfrom' and 'shipto'
  address_shipment_from_address_idToaddress?: Prisma.shipfromCreateNestedOneWithoutShipmentInput;
  address_shipment_to_address_idToaddress?: Prisma.shiptoCreateNestedOneWithoutShipmentInput;
}
