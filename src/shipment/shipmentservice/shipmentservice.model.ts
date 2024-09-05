import { Prisma } from '@prisma/client';

// Define a type that omits the shipment field from the Prisma-generated type and adds it back as optional
// type ShipmentServiceCreateInput = Omit<
//   Prisma.shipmentserviceCreateInput,
//   'shipment'
// > & {
//   shipment?: Prisma.shipmentCreateNestedOneWithoutShipmentserviceInput;
// };

// Use the Prisma-generated type directly and override the optional field

// Extend Prisma.shipmentserviceCreateInput to make the 'shipment' field optional
export class shipmentservice
  implements Omit<Prisma.shipmentserviceCreateInput, 'shipment'>
{
  shipment_service_id?: number; // Optional, if auto-incremented
  shipment_id: number; // Required
  service_id: number; // Required
  service_name: string; // Required
  service_description?: string | null; // Optional
  service_price: Prisma.Decimal | number; // Supports both Decimal and number
  service_status: 'pending' | 'in_progress' | 'completed' | 'cancelled'; // Enum type for status
  created_at?: Date | string; // Optional
  updated_at?: Date | string; // Optional
  shipment?: Prisma.shipmentCreateNestedOneWithoutShipmentserviceInput; // Optional nested input
}
