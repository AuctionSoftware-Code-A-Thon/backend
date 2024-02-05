import express from "express";
import { isAuthenticated } from "../middlewares";
import {
  createProject,
  deleteProject,
  readProjects,
  updateProject,
} from "../services/projects";

export default (router: express.Router) => {
  router.post("/projects/get", isAuthenticated, readProjects);
  router.post("/projects/create", isAuthenticated, createProject);
  router.post("/projects/delete", isAuthenticated, deleteProject);
  router.post("/projects/update", isAuthenticated, updateProject);
};
