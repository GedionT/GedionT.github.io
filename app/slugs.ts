import type { Project } from "../types";

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const tagPath = (tag: string) => `/blogs/tags/${slugify(tag)}`;

export const projectPath = (project: Pick<Project, "slug">) => `/projects/${project.slug}`;
