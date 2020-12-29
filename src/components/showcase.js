import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Header from "./header_main";

import scrollAnimate from "aos";
import "aos/dist/aos.css";

import { cards } from "../data.json";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(4, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "block",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function ShowCase() {
  const classes = useStyles();

  useEffect(() => {
    scrollAnimate.init({ duration: 2500 });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header title="Portfolio" />
      <main>
        {/* Hero unit */}
        <Container maxWidth="sm">
          <Card className={classes.heroContent}>
            <Typography
              component="h4"
              variant="h5"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              My Previous Works
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              From Personal Projects, Hackathon Works, and Contract Products
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link style={{ textDecoration: "none" }} to="/contact">
                    <Button variant="contained" color="primary">
                      Let's talk
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link style={{ textDecoration: "none" }} to="/about">
                    <Button variant="outlined" color="primary">
                      Learn More
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid data-aos="fade-up" item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title={card.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>{card.desc}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      href={card.link}
                      target={"_blank"}
                      size="small"
                      color="primary"
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
