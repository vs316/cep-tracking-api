import { Prisma } from '@prisma/client';

export class payment implements Prisma.paymentCreateInput {
  payment_id?: number;
  shipment_id?: number | null;
  amount?: Prisma.Decimal | number | null;
  payment_method?: string | null;
  payment_status?: string | null;
  created_at?: string | Date | null;
  shipment?: Prisma.shipmentCreateNestedOneWithoutPaymentInput | null;
}
