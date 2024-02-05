import express from "express";
import { INVALID_REQUEST, SYSTEM_ERROR } from "./constants";
export const handleInternalServerError = async (
  res: express.Response,
  error: Error
) => {
  return res.status(500).json({
    errorMessage: SYSTEM_ERROR,
    systemError: error,
  });
};

export const handleInvalidRequestError = async (res: express.Response) => {
  return res.status(400).json({ errorMessage: INVALID_REQUEST });
};
