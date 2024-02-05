import express from "express";
import {
  createProjectDB,
  deleteProjectDB,
  readProjectByidDB,
  readProjectsByCategory,
  readProjectsByCategorySortedByCategory,
  readProjectsDB,
  readProjectsSortedByCategory,
  updateProjectDB,
} from "../db/projects/projects";
import { INVALID_PROJECT_DETAILS, SYSTEM_ERROR } from "../helpers/constants";
import { ProjectData } from "../helpers/types";
import { validateProject, validateUpdateProject } from "../helpers/validations";

export const createProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const valid = validateProject(req.body);
    if (valid.error) {
      return res.status(400).json({ errorMessage: INVALID_PROJECT_DETAILS });
    }
    const project: Omit<ProjectData, "pid"> = valid.value;
    const projectDetails = await createProjectDB(project);
    return res.status(200).json(projectDetails).end();
  } catch (error) {
    return res.status(500).json({
      errorMessage: SYSTEM_ERROR,
      systemError: error,
    });
  }
};
export const updateProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const valid = validateUpdateProject(req.body);
    if (valid.error) {
      return res.status(400).json({ errorMessage: INVALID_PROJECT_DETAILS });
    }
    const project: ProjectData = valid.value;
    const projectDetails = await updateProjectDB(project.pid, project);
    return res.status(200).json(projectDetails).end();
  } catch (error) {
    return res.status(500).json({
      errorMessage: SYSTEM_ERROR,
      systemError: error,
    });
  }
};
export const deleteProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { pid } = req.body;
    if (!pid) {
      return res.status(400).json({ errorMessage: INVALID_PROJECT_DETAILS });
    }
    await deleteProjectDB(parseInt(pid, 10));
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({
      errorMessage: SYSTEM_ERROR,
      systemError: error,
    });
  }
};

export const readProjects = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      pageNumber,
      projectsPerPage,
      pCategory,
      isDataSorted,
      isDescendingOrder,
    } = req.body;
    let projects: any;
    if (!pageNumber || !projectsPerPage) {
      return res.status(400).json({ errorMessage: INVALID_PROJECT_DETAILS });
    }
    if (!pCategory) {
      if (!isDataSorted) {
        projects = await readProjectsDB(
          parseInt(pageNumber, 10),
          parseInt(projectsPerPage, 10)
        );
      } else {
        projects = await readProjectsSortedByCategory(
          parseInt(pageNumber, 10),
          parseInt(projectsPerPage, 10),
          isDescendingOrder
        );
      }
    } else {
      if (!isDataSorted) {
        projects = await readProjectsByCategory(
          parseInt(pageNumber, 10),
          parseInt(projectsPerPage, 10),
          pCategory
        );
      } else {
        projects = await readProjectsByCategorySortedByCategory(
          parseInt(pageNumber, 10),
          parseInt(projectsPerPage, 10),
          pCategory,
          isDescendingOrder
        );
      }
    }
    return res.status(200).json(projects).end();
  } catch (error) {
    return res.status(500).json({
      errorMessage: SYSTEM_ERROR,
      systemError: error,
    });
  }
};

export const readProjectByid = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { pid } = req.body;
    if (!pid) {
      return res.status(400).json({ errorMessage: INVALID_PROJECT_DETAILS });
    }
    const project = await readProjectByidDB(parseInt(pid, 10));
    return res.status(200).json(project).end();
  } catch (error) {
    return res.status(500).json({
      errorMessage: SYSTEM_ERROR,
      systemError: error,
    });
  }
};
