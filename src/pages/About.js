import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SocialBar from "../components/social_bar";
import SkillChips from "../components/skill_chips";

import scrollAnimate from "aos";
import "aos/dist/aos.css";

import { skills } from "../data.json";

const useStyles = makeStyles({
  root: {
    minWidth: 80,
    position: "center",
  },
  title: {
    fontSize: 29,
    textDecoration: "bold",
  },
  sub: {
    fontSize: 24,
    textDecoration: "bold",
  },
  pos: {
    marginTop: 4,
    marginBottom: 4,
  },
});

const About = () => {
  const classes = useStyles();
  useEffect(() => {
    scrollAnimate.init({ duration: 2500 });
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="application" />
        <meta
          name="description"
          content="Educational history, skills, and affiliations"
        />
        <title>Education, Skills, and Experiences</title>
        <link rel="canonical" href="https://gedion-tesh.me" />
      </Helmet>

      <div className="board">
        <Card className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <br />
              <img
                className="circular-square"
                src="data:image/jpeg;base64,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"
                alt="Gedion Teshome"
              />
            </Grid>
            <Grid item xs={6}>
              <h1 className={classes.title}> GEDION TESHOME </h1>
              <SocialBar />
              <p>
                Software Engineering, AASTU '22 <br />
                Professional Web-Backend Engineer <br />
                CS Education and Tech Advocate <br />
              </p>
            </Grid>
          </Grid>
        </Card>
        <br />
        <Card data-aos="fade-left" className={classes.root}>
          <Grid container>
            <Grid item xs={3}>
              <h1 className={classes.sub}>Skills</h1>
            </Grid>
            <Grid>
              <SkillChips skills={skills} />
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  );
};

export default About;
