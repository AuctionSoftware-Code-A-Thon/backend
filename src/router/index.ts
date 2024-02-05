import express from "express";
import authentication from "./authentication";
import projects from "./projects";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  projects(router);
  return router;
};
