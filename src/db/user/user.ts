import { db } from "../../helpers/db.server";
import { User } from "../../helpers/types";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return db.user.findUnique({ where: { email } });
};

export const createUser = async (
  user: Omit<User, "uid">
): Promise<Omit<User, "saltedPassword" | "sessionToken" | "salt">> => {
  return db.user.create({
    data: user,
    select: {
      uid: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      address: true,
      saltedPassword: false,
      sessionToken: false,
      salt: false,
    },
  });
};

export const updateUser = async (
  user: User
): Promise<Omit<User, "saltedPassword" | "salt">> => {
  return db.user.update({
    where: { uid: user.uid },
    data: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      sessionToken: user.sessionToken,
    },
    select: {
      uid: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      address: true,
      saltedPassword: false,
      sessionToken: true,
      salt: false,
    },
  });
};

export const getUserBySessionToken = async (
  sessionToken: string
): Promise<User | null> => {
  return db.user.findFirst({ where: { sessionToken } });
};

export const getUserByUhid = async (uid: number): Promise<User | null> => {
  return db.user.findUnique({ where: { uid } });
};
