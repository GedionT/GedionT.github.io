import HomeView from "./routes/HomeView";
import AboutView from "./routes/AboutView";
import ProjectsView from "./routes/ProjectsView";
import BlogsView from "./routes/BlogsView";
import ContactView from "./routes/ContactView";

export const routes = [
    { path: "/", element: <HomeView /> },
    { path: "/about", element: <AboutView /> },
    { path: "/projects", element: <ProjectsView /> },
    { path: "/blogs", element: <BlogsView /> },
    { path: "/contact", element: <ContactView /> },
];
