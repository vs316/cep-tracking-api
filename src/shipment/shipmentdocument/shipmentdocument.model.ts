import { Prisma } from '@prisma/client';

export class shipmentdocument implements Prisma.shipmentdocumentCreateInput {
  document_id?: number; // Optional, if auto-incremented
  shipment_id?: number | null; // Optional, since it's nullable
  document_type?: string | null; // Optional, since it's nullable
  document_file?: Buffer | null; // Optional, since it's nullable and stored as a binary type
  shipment?: Prisma.shipmentCreateNestedOneWithoutShipmentdocumentInput; // Optional nested input
}
