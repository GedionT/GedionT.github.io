import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import InfoCard from "../components/info_card";
import Container from "@material-ui/core/Container";

import scrollAnimate from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    scrollAnimate.init({ duration: 2500 });
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="application" />
        <meta
          name="description"
          content="Gedion Teshome: Software Engineer, Fullstack Developer, Business advisor, All things tech and entrepreneurship"
        />
        <title>Gedion Teshome</title>
        <link rel="canonical" href="https://gedion-tesh.me" />
      </Helmet>
      <Container data-aos="fade-down" maxWidth="sm">
        <br />
        <br />
        <br />
        <InfoCard />
      </Container>
    </>
  );
};

export default Home;
