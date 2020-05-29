import React from "react";
import { createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      height: 200,
      zIndex: 9999,
    },

    img: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
    },

    badge: {
      width: "100%",
      height: "100%",
      display: "flex",
    },
  })
);

interface Props {
  background: string;
}

function OwnBackground({ background }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={background} alt="Your background" className={classes.img} />
    </div>
  );
}

export default OwnBackground;
