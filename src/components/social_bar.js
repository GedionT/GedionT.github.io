import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import Link from "@material-ui/core/Link";
import { Button } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function SocialBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ButtonGroup
        size="small"
        color="inherit"
        aria-label="large outlined primary button group"
      >
        <Button>
          <Link color="inherit" href="https://github.com/GedionT">
            <GitHubIcon />
          </Link>
        </Button>
        <Button>
          <Link color="inherit" href="https://linkedin.com/in/gedion-teshome">
            <LinkedInIcon />
          </Link>
        </Button>
        <Button>
          <Link color="inherit" href="https://twitter.com/gedionteshome">
            <TwitterIcon />
          </Link>
        </Button>
        <Button>
          <Link color="inherit" href="https://devpost.com/gedionteshome">
            <img src="/images/devpost_logo.png" alt="devpost" width="25px" />
          </Link>
        </Button>
      </ButtonGroup>
    </div>
  );
}
