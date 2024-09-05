import { Prisma } from '@prisma/client';

export class ShipmentNotification
  implements Prisma.shipmentnotificationCreateInput
{
  notification_id?: number; // Optional, if auto-incremented
  shipment_id?: number | null; // Optional
  notification_type?: string | null; // Optional, since it's nullable in the schema
  sent_at?: Date | string; // Optional, since it has a default value in the schema
  shipment?: Prisma.shipmentCreateNestedOneWithoutShipmentnotificationInput; // Optional nested input
}
