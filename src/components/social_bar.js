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
      margin: theme.spacing(1)
    }
  }
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
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAYFBMVEX///8AAADj4+MpKSnu7u6qqqpzc3P7+/uvr6/V1dX29vYaGhre3t4eHh6mpqZra2tQUFCHh4eAgIBXV1cODg69vb3Pz8+2trY3Nzc9PT1jY2OOjo5JSUlERESdnZ1dXV0UrjOrAAADLElEQVR4nO1a0XLjMAgUjlPHiu0kbeM2TpP+/1+2D3e1czUgAZbnZrSPnSlssFghwLmMjIyMjIyMjP8AvhDCGxE4tRsR2pON/x7E6E0IfMoJfFr4f5P7B3gzILDXENjr/W81/gG2Wv9lqyPQlkoCJ51/AGUq1soAfIegVhF40voHeFIFQO9fp0YbCwIbuX+VBo0Qq5F/tyHwLr0VOxv/AJ3Mf6NOwb9oGxGBZyv/AM8S//WrHYFXiRq92PkHeIn3f7b0D3CO9e8vs3bu21/ouutwY4uGS2wq7ubtzJvxvu4GhsMuzn85HwDAb/equdIhiCsMMGOkFU9SuMb4RzWI+RkNUUFHqRFaBnBxrK64ekQUBngZwH9IIn3D1eioIECwP4b6J8qAkKOMMwgsDMoPHQFMQwA+wlKRKgNGC/3uD86/TzdaywcVBiVVCP4QqA6Tvx7+ia3HLrJNSAjIMmAk8Jip7e5BpNFjEFAYNJR/lADA8PAl0F/Bq9EB+1eGAOynaV5gBg6cf6YdQhB4FBpUS5lnisc1iCewn8QXLeiOdGGApnAIARhG4xX6S8jCoLypCEyN3zETNyoV0f8KJDB5BuKX0p0IAOefIzBR+xJ/1+Eh4LsBHIExy1A1JNSI1qAgAjBaIxQVUyNag8IIjLaJ84SoUchThCUwPkCoS3X2mcJpUBiBMRGpBuOsGq1OYPVPYHMIix9r8Ydw/TQM6MsuK0TrSzF7Gy99GVFxCyKgvo7ZVFy6IGFTcfGSDC9nAwhYFKV4b4QlYFSWO082aBM8TOgxWYKnmauoSWmKxyn5OErxPCdr0yQNCioVk7RoqFRM06RyDk3FRG06vE+WqFGJp2KqVi2aiqma1aiWUu16uqCLbNe7Yv5bJhtYYBVNupGNc4ZTOxAMrYzHZoKxnXODnX/R4NL1dh9BNLo1HB4Lh9euVO0wTSAc35stEIgXGIhbMQqKhTKTVFQssdikomqpsNefQ9Uik8EumXKVC7sVw6HeK1XuE6rX+bTrXOqFRmUqGqx06lLRYqnV1fJUNFnr5XoWFGwWm11xWXe1+/teXnm5PSMjIyMjIyNjUXwByXAzRloH8t4AAAAASUVORK5CYII="
              alt="devpost"
              width="25px"
            />
          </Link>
        </Button>
      </ButtonGroup>
    </div>
  );
}
