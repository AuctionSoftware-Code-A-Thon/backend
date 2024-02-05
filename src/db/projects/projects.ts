import { db } from "../../helpers/db.server";
import { ProjectData } from "../../helpers/types";

export const createProjectDB = async (data: Omit<ProjectData, "pid">) => {
  const newProject = await db.projects.create({
    data: data,
  });
  return newProject;
};

export const updateProjectDB = async (projectId: number, data: ProjectData) => {
  const updatedProject = await db.projects.update({
    where: {
      pid: projectId,
    },
    data: data,
  });
  return updatedProject;
};

export const deleteProjectDB = async (projectId: number) => {
  const deletedProject = await db.projects.delete({
    where: {
      pid: projectId,
    },
  });
  return deletedProject;
};

export const readProjectsDB = async (
  pageNumber: number,
  projectsPerPage: number
) => {
  const projects = await db.projects.findMany({
    orderBy: {
      pCategory: "asc",
    },
    skip: (pageNumber - 1) * projectsPerPage,
    take: projectsPerPage,
  });
  return projects;
};
export const readProjectsSortedByCategory = async (
  pageNumber: number,
  projectsPerPage: number,
  isDesc: boolean
) => {
  const projects = await db.projects.findMany({
    orderBy: {
      pCategory: isDesc ? "desc" : "asc",
    },
    skip: (pageNumber - 1) * projectsPerPage,
    take: projectsPerPage,
  });
  return projects;
};

export const readProjectsByCategorySortedByCategory = async (
  pageNumber: number,
  projectsPerPage: number,
  category: string,
  isDesc: boolean
) => {
  const projects = await db.projects.findMany({
    where: {
      pCategory: category,
    },
    orderBy: {
      pCategory: isDesc ? "desc" : "asc",
    },
    skip: (pageNumber - 1) * projectsPerPage,
    take: projectsPerPage,
  });
  return projects;
};
export const readProjectsByCategory = async (
  pageNumber: number,
  projectsPerPage: number,
  category: string
) => {
  const projects = await db.projects.findMany({
    where: {
      pCategory: category,
    },
    skip: (pageNumber - 1) * projectsPerPage,
    take: projectsPerPage,
  });
  return projects;
};
