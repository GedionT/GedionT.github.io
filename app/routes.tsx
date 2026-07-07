import React from "react";

const HomeView = React.lazy(() => import("./routes/HomeView"));
const AboutView = React.lazy(() => import("./routes/AboutView"));
const ProjectsView = React.lazy(() => import("./routes/ProjectsView"));
const ProjectCaseStudyView = React.lazy(() => import("./routes/ProjectCaseStudyView"));
const BlogsView = React.lazy(() => import("./routes/BlogsView"));
const ContactView = React.lazy(() => import("./routes/ContactView"));

export const routes = [
    { path: "/", element: <HomeView /> },
    { path: "/about", element: <AboutView /> },
    { path: "/projects", element: <ProjectsView /> },
    { path: "/projects/:projectId", element: <ProjectCaseStudyView /> },
    { path: "/blogs", element: <BlogsView /> },
    { path: "/blogs/tags/:tagSlug", element: <BlogsView /> },
    { path: "/blogs/:articleId", element: <BlogsView /> },
    { path: "/contact", element: <ContactView /> },
];
