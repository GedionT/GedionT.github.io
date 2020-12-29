import React from "react";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "../components/blog_specs/header";
import MainFeaturedPost from "../components/blog_specs/main_featured_post";
import Main from "../components/blog_specs/main";
import FeaturedPost from "../components/blog_specs/featured_post";
import raw from "raw.macro";

const post1 = raw("../components/blog_specs/blog-post1.md");
const post2 = raw("../components/blog_specs/blog-post2.md");

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Opportunities", url: "#" },
];

const mainFeaturedPost = {
  title: "How the pandemic opened my eyes",
  description:
    "After long hours of researching and reading about computer science student opportunities, I learned that formal education....",
  image: "https://source.unsplash.com/random",
  imgText: "Education and Opportunities",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Eating your frogs well",
    date: "Nov 12",
    description:
      "Do you also procrastinate? Take two minutes to read what the book 'Eat that frog' has to say about it.",
    image: "https://source.unsplash.com/random",
    imageText: "Coming Soon",
  },
  {
    title: "Things you can do to come out competent after the lock-down",
    date: "Nov 11",
    description: "Competitions, Hackathons, CTFs, Volunteering, Learning Ops.",
    image: "https://source.unsplash.com/random",
    imageText: "Coming Soon",
  },
];

const posts = [post1, post2];

export default function Blog() {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <meta charSet="application" />
        <title>Blogs, Writings, and Publications</title>
        <link rel="canonical" href="https://gedion-tesh.me" />
      </Helmet>

      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="Suggested Reads" posts={posts} />
          </Grid>
        </main>
      </Container>
    </>
  );
}
