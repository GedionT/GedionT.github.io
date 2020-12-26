import React from "react";
import { Helmet } from "react-helmet";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <meta charSet="application" />
        <title>Page Not Found</title>
        <link rel="canonical" href="https://gedion-tesh.me" />
      </Helmet>
      <Container maxWidth="sm">
        <h1>Hey Mate, Are You Lost?</h1>
        <h2>
          You made a wrong turn. It's a 404, Click On My BitMoji, He'll take you
          Home{" "}
        </h2>
        <center>
          <Link to="/">
            <img src="/images/mymoji.svg" alt="hello lost friend" width="70%" />
          </Link>
        </center>
      </Container>
    </>
  );
};

export default NotFound;
