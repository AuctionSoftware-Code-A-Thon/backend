export type User = {
  uid: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  saltedPassword: string;
  sessionToken: string;
  salt: string;
};
export type createUserRequest = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  password: string;
};
