import express from "express";
import { User } from "helpers/types";
import { get } from "lodash";
import { createUser, getUserByEmail, updateUser } from "../db/user/user";
import { authenticate, random } from "../helpers";
import {
  DOMAIN,
  DUPLICATE_USER,
  IDENTITY,
  INVALID_LOGIN_DETAILS,
  INVALID_USER_DETAILS,
  LOG_OUT_SUCCESS,
  SESSION_TOKEN_COOKIE,
  SYSTEM_ERROR,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from "../helpers/constants";
import {
  validateCreateUserData,
  validateLoginData,
} from "../helpers/validations";
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const valid = validateLoginData(req.body);
    if (valid.error) {
      return res.status(400).json({ errorMessage: INVALID_LOGIN_DETAILS });
    }

    const user = await getUserByEmail(valid.value.email);

    if (!user) {
      return res.status(400).json({ errorMessage: USER_NOT_FOUND });
    }

    const expectedHash = authenticate(user.salt, valid.value.password);

    if (user.saltedPassword != expectedHash) {
      return res.status(403).json({ errorMessage: WRONG_PASSWORD });
    }

    const salt = random();
    user.sessionToken = authenticate(salt, user.email);

    const updatedUser = await updateUser(user);

    res.cookie(SESSION_TOKEN_COOKIE, user.sessionToken, {
      domain: DOMAIN,
      path: "/",
      httpOnly: true,
    });

    return res.status(200).json(updatedUser).end();
  } catch (error) {
    return res.status(500).json({
      errorMessage: SYSTEM_ERROR,
      systemError: error,
    });
  }
};
export const logout = async (req: express.Request, res: express.Response) => {
  try {
    const user = get(req, IDENTITY) as User;
    user.sessionToken = "";
    await updateUser(user);
    return res.status(200).json({
      successMessage: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: SYSTEM_ERROR,
      systemError: error,
    });
  }
};
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const valid = validateCreateUserData(req.body);
    if (valid.error) {
      return res.status(400).json({ errorMessage: INVALID_USER_DETAILS });
    }
    const existingUser = await getUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ errorMessage: DUPLICATE_USER });
    }
    const salt = random();
    const user = await createUser({
      email: valid.value.email,
      saltedPassword: authenticate(salt, valid.value.password),
      address: valid.value.address,
      firstName: valid.value.firstName,
      lastName: valid.value.lastName,
      phoneNumber: valid.value.phoneNumber,
      sessionToken: "",
      salt: salt,
    });
    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(500).json({
      errorMessage: SYSTEM_ERROR,
      systemError: error,
    });
  }
};
