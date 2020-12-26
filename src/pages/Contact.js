import React, { useState } from "react";
import Avatar from "../components/avatar";
import { Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export default function Contact() {
  const classes = useStyles();
  const [message, setMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    sub: false,
  });

  const onChange = (e) => {
    const value = e.target.value;
    setMessage({
      ...message,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // axios
    //   .post("/site")
    //   .then((res) => {})
    //   .catch((err) => res.json("error:", err));
    console.log("onDev chill");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar />
        <Typography component="h1" variant="h5">
          Let's Find You a Solution
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="filled"
                required
                value={message.firstName}
                onChange={onChange}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                required
                value={message.lastName}
                onChange={onChange}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                value={message.email}
                onChange={onChange}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                value={message.description}
                onChange={onChange}
                fullWidth
                multiline
                rows={4}
                name="description"
                label="Message Description"
                type="textarea"
                id="message"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={message.sub}
                    onChange={onChange}
                    color="primary"
                  />
                }
                label="I want to be added in future mailing list and email notification."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <br />
    </Container>
  );
}
