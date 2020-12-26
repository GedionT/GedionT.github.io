import React from "react";
import { Link } from "react-router-dom";
import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CodeIcon from "@material-ui/icons/Code";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/PersonPin";
import HomeIcon from "@material-ui/icons/Home";
import NoteIcon from "@material-ui/icons/Note";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.25),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(0.5),
  },
  workIcon: {
    background: "#fff44f",
  },
  phoneIcon: {
    background: "#e3ff00",
  },
}));

export default function Navigation() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Link to="/about">
        <Tooltip title="About">
          <Fab color="primary" aria-label="add">
            <PersonIcon />
          </Fab>
        </Tooltip>
      </Link>
      <Link to="/contact">
        <Tooltip title="Contact">
          <Fab color="secondary" aria-label="edit">
            <EditIcon />
          </Fab>
        </Tooltip>
      </Link>

      <Link style={{ textDecoration: "none" }} to="/">
        <Fab variant="extended">
          <HomeIcon className={classes.extendedIcon} />
          Home
        </Fab>
      </Link>
      <Link to="/portfolio">
        <Tooltip title="Portfolio">
          <Fab className={classes.phoneIcon} aria-label="work">
            <CodeIcon />
          </Fab>
        </Tooltip>
      </Link>

      <Link to="/blogs">
        <Tooltip title="Blogs">
          <Fab className={classes.workIcon} aria-label="notes">
            <NoteIcon />
          </Fab>
        </Tooltip>
      </Link>
    </Container>
  );
}
