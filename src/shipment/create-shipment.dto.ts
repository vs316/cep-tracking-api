export class CreateShipmentDto {
  shipfrom: CreateAddressDto; // Include address details
  shipto: CreateAddressDto;
}

export class CreateAddressDto {
  address_line_1: string;
  address_line_2?: string;
  locality?: string;
  city?: string;
  state?: string;
  pincode?: string;
}
