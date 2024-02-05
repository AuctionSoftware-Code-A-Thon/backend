import Joi from "joi";
import { createUserRequest } from "./types";

export const validateLoginData = (login: {
  email: string;
  password: string;
}) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  });
  return loginSchema.validate(login);
};

export const validateCreateUserData = (req: createUserRequest) => {
  const createUserSchema = Joi.object<createUserRequest>({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().min(8).max(36).required(),
  });
  return createUserSchema.validate(req);
};
