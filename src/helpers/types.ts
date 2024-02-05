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

export type ProjectData = {
  pid: number;
  pname: string;
  pdescription: string;
  funds: string;
  pCategory: string;
  purl: string;
};
