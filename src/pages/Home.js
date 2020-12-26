import React, { useEffect } from "react";
import InfoCard from "../components/info_card";
import Container from "@material-ui/core/Container";

import scrollAnimate from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    scrollAnimate.init({ duration: 2500 });
  }, []);

  return (
    <Container data-aos="fade-up" maxWidth="sm">
      <br />
      <br />
      <br />
      <InfoCard />
    </Container>
  );
};

export default Home;
