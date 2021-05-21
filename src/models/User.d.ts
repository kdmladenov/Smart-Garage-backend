import { Address } from "./Address";

export interface User {
  userId?: number;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phone: string;
  email: string;
  password: string;
  city: string;
  country: string;
  postalCode: number;
  streetAddress?: string;
  addressId: number;
  role: string;
}
