export class CreateAddressDto {
  address_line_1: string;
  address_line_2?: string;
  locality?: string;
  city?: string;
  state?: string;
  pincode?: string;
  uuid: string;
}
