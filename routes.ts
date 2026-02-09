import HomeView from "./components/views/HomeView";
import AboutView from "./components/views/AboutView";
import ProjectsView from "./components/views/ProjectsView";
import BlogsView from "./components/views/BlogsView";
import ContactView from "./components/views/ContactView";

export const routes = [
    { path: "/", component: HomeView },
    { path: "/about", component: AboutView },
    { path: "/projects", component: ProjectsView },
    { path: "/blogs", component: BlogsView },
    { path: "/contact", component: ContactView },
];
