import { Prisma } from '@prisma/client';

export type ShipmentCreateInput = Omit<
  Prisma.shipmentCreateInput,
  'shipment_id'
> & {
  // Optional fields for creating related records
  shipFromDetails?: {
    first_name: string;
    last_name: string;
    email?: string;
    phone_number?: string;
    pincode?: string;
    city?: string;
    locality?: string;
    address_line_1?: string;
    address_line_2?: string;
  };
  shipToDetails?: {
    company?: string;
    first_name: string;
    last_name: string;
    email?: string;
    phone_number?: string;
    pincode?: string;
    city?: string;
    locality?: string;
    address_line_1?: string;
    address_line_2?: string;
  };
  paymentDetails?: {
    amount: number;
    payment_method: string;
    payment_status: string;
  };
  shipmentItems?: Array<{
    item_description?: string;
    quantity?: number;
    weight?: number;
    value?: number;
    descriptionOfGoods?: string;
    servicetype?: string;
  }>;
};
