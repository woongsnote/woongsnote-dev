import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { Project } from "../interfaces/Project";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).use(remarkGfm).process(markdown);
  return result.toString();
};

const getDir = (path: string) => join(process.cwd(), path);
const PROJECT_DIR = getDir("/content/projects");

const getFileNames = (dir: string): string[] => {
  return fs.readdirSync(dir);
};

const getBlobFileNames = () => {
  return getFileNames(PROJECT_DIR);
};

const getItemInPath = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return { ...data, content } as Project;
};

const getProject = (name: string) => {
  const project = getItemInPath(join(PROJECT_DIR, name));
  project.slug = name.replace(/\.md$/, "");
  return project;
};

const getProjectBySlug = async (slug: string) => {
  const fileName = slug + ".md";
  const project = getProject(fileName);
  project.content = await markdownToHtml(project.content);
  return project;
};

const getProjects = (): Project[] => {
  const names = getBlobFileNames();
  const items = names.map(getProject);
  return items;
};

export { getBlobFileNames, getProjects, getProjectBySlug };
