
export enum Tab {
  About = "about",
  Contact = "contact",
  Home = "home",
  Projects = "projects",
  Blogs = "blogs"
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  tech: string[];
  link?: string;
  image?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readingTime: string;
}

export interface CareerEvent {
  year: string;
  title: string;
  organization: string;
  location: string;
  logo: string;
  description?: string;
  tags?: string[];
}

export interface ArticleMetadata {
  id: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  filePath: string;
  tags: string[];
}