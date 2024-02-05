import { db } from "../../helpers/db.server";
import { ProjectData } from "../../helpers/types";

export const createProjectDB = async (data: Omit<ProjectData, "pid">) => {
  const newProject = await db.projects.create({
    data: data,
  });
  return newProject;
};
export const readProjectByidDB = async (pid: number) => {
  const project = await db.projects.findUnique({
    where: {
      pid,
    },
  });
  return project;
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
  const totalCount = await db.projects.count();
  const totalPages = Math.ceil(totalCount / projectsPerPage);
  const projects = await db.projects.findMany({
    orderBy: {
      pCategory: "asc",
    },
    skip: (pageNumber - 1) * projectsPerPage,
    take: projectsPerPage,
  });
  return { projects, totalPages, currentPage: pageNumber };
};
export const readProjectsSortedByCategory = async (
  pageNumber: number,
  projectsPerPage: number,
  isDesc: boolean
) => {
  const totalCount = await db.projects.count();
  const totalPages = Math.ceil(totalCount / projectsPerPage);
  const projects = await db.projects.findMany({
    orderBy: {
      pCategory: isDesc ? "desc" : "asc",
    },
    skip: (pageNumber - 1) * projectsPerPage,
    take: projectsPerPage,
  });
  return { projects, totalPages, currentPage: pageNumber };
};

export const readProjectsByCategorySortedByCategory = async (
  pageNumber: number,
  projectsPerPage: number,
  category: string,
  isDesc: boolean
) => {
  const totalCount = await db.projects.count({
    where: {
      pCategory: category,
    },
  });

  const totalPages = Math.ceil(totalCount / projectsPerPage);
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
  return { projects, totalPages, currentPage: pageNumber };
};
export const readProjectsByCategory = async (
  pageNumber: number,
  projectsPerPage: number,
  category: string
) => {
  const totalCount = await db.projects.count({
    where: {
      pCategory: category,
    },
  });

  const totalPages = Math.ceil(totalCount / projectsPerPage);
  const projects = await db.projects.findMany({
    where: {
      pCategory: category,
    },
    skip: (pageNumber - 1) * projectsPerPage,
    take: projectsPerPage,
  });
  return { projects, totalPages, currentPage: pageNumber };
};
