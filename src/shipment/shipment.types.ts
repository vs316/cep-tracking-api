// shipment.types.ts
import { Prisma } from '@prisma/client';

// Type for returned shipment with relations
export type ShipmentWithRelations = Prisma.shipmentGetPayload<{
  include: {
    payment: true;
    user: true;
    shipfrom: true;
    shipto: true;
    shipmentitem: true;
  };
}>;
