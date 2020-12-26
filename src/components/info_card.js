import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { init } from "ityped";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    position: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 36,
    textDecoration: "bold",
  },
  pos: {
    marginBottom: 5,
  },
});

export default function InfoCard() {
  useEffect(() => {
    const typed = document.querySelector("#typed");
    init(typed, {
      showCursor: false,
      strings: ["HI, I'M GED"],
      typeSpeed: -25,
      startDelay: 1700,
      loop: false,
    });
  }, []);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <center>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            id="typed"
            className={classes.title}
            color="textSecondary"
            gutterBottom
          ></Typography>

          <Typography className={classes.pos} color="textSecondary">
            I'm a Software Engineer who specializes in Backend Development{" "}
            {bull}
            FullStack Works {bull} Data Science {bull} Machine Learning {bull}{" "}
            Cloud Services.
          </Typography>
          <Typography variant="body2" component="p">
            I enjoy working on design-centric and data-driven projects. I like
            trying new design patterns. I'm continuously learning to leverage
            the power of data and tell a story to make strategic and meaningful
            decisions. I love coding in
            <br />
            {'"Javascript and Python"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Link style={{ textDecoration: "none" }} to="/contact">
            <Button size="large" color="primary">
              Hire Me
            </Button>
          </Link>
        </CardActions>
      </Card>
    </center>
  );
}
