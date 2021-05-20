interface UserDetailed {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phone: string;
  email: string;
  password: string;
  reenteredPassword: string;
  city: string;
  country: string;
  postalCode: number;
  streetAddress?: string;
  role: string;
}

export default UserDetailed;
