import express from "express";
import { get } from "lodash";
import { isAuthenticated } from "../middlewares";
import { login, logout, register } from "../services/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/logout", isAuthenticated, logout);
  router.get(
    "/auth/isAuthenticated",
    isAuthenticated,
    (req: express.Request, res: express.Response) => {
      const userInfo = get(req, "identity");
      return res.status(200).json({
        userInfo,
      });
    }
  );
};
