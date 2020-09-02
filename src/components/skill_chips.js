import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  }
}));

export default function SkillChips({ skills }) {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      {skills.map((skill) => (
        <Chip
          key={skill.id}
          size="small"
          variant="outlined"
          label={skill.title}
          deleteIcon={<DoneIcon />}
          avatar={<Avatar src={skill.image} />}
        />
      ))}
    </Container>
  );
}
