import { Prisma } from '@prisma/client';

export class shipmentitem implements Prisma.shipmentitemCreateInput {
  shipment_item_id?: number;
  shipment_id?: number | null;
  item_description?: string | null;
  quantity?: number | null;
  weight?: Prisma.Decimal | number | null;
  value?: Prisma.Decimal | number | null;
  descriptionOfGoods?: string;
  servicetype?: string;
  shipment?: Prisma.shipmentCreateNestedOneWithoutShipmentitemInput | null;
}
