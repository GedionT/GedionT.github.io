import React from "react";
import { Helmet } from "react-helmet";
import ShowCase from "../components/showcase";

const Portfolio = () => {
  return (
    <>
      <Helmet>
        <meta charSet="application" />
        <meta
          name="description"
          content="Previous projects, portfolio, and activities"
        />
        <title>Portfolio and Previous Works</title>
        <link rel="canonical" href="https://gedion-tesh.me" />
      </Helmet>

      <div>
        <ShowCase />
      </div>
    </>
  );
};

export default Portfolio;
