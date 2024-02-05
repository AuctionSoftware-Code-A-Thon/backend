import express from "express";
import { merge } from "lodash";
import { getUserBySessionToken } from "../db/user/user";
import { INVALID_SESSION, SESSION_TOKEN_COOKIE } from "../helpers/constants";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN_COOKIE];
    if (!sessionToken) {
      return res.status(403).json({
        errorMessage: INVALID_SESSION,
      });
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(403).json({
        errorMessage: INVALID_SESSION,
      });
    }
    delete existingUser.saltedPassword;
    delete existingUser.sessionToken;
    delete existingUser.salt;
    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    return res.sendStatus(400);
  }
};
