import React from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <h1>Hey Fella, Are You Lost?</h1>
      <h4>It's a 404, Click My BitMoji, I'll take you Home </h4>
      <center>
        <Link to="/">
          <img src="/images/mymoji.svg" alt="hello lost friend" width="70%" />
        </Link>
      </center>
    </Container>
  );
};

export default NotFound;
