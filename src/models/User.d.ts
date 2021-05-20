import { Address } from "./Address";

export interface User {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phone: string;
  email: string;
  password: string;
  address: Address;
  addressId: number;
  role: string;
}
