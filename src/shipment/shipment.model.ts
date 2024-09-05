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

  payment?: Prisma.paymentCreateNestedManyWithoutShipmentInput;
  user?: Prisma.userCreateNestedOneWithoutShipmentInput;
  address_shipment_from_address_idToaddress?: Prisma.addressCreateNestedOneWithoutShipment_shipment_from_address_idToaddressInput;
  address_shipment_to_address_idToaddress?: Prisma.addressCreateNestedOneWithoutShipment_shipment_to_address_idToaddressInput;
  shipmentcase?: Prisma.shipmentcaseCreateNestedManyWithoutShipmentInput;
  shipmentdocument?: Prisma.shipmentdocumentCreateNestedManyWithoutShipmentInput;
  shipmentitem?: Prisma.shipmentitemCreateNestedManyWithoutShipmentInput;
  shipmentnotification?: Prisma.shipmentnotificationCreateNestedManyWithoutShipmentInput;
  shipmentservice?: Prisma.shipmentserviceCreateNestedManyWithoutShipmentInput;
}
