import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        target={"_blank"}
        href="https://linkedin.com/in/gedion-teshome"
      >
        Gedion Teshome
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
