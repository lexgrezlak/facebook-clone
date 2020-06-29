import React from "react";
import { createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // display: "flex",
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

function Background({ background }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        src={
          background ||
          "https://cdn.pixabay.com/photo/2018/07/18/19/45/brick-3547144_960_720.jpg"
        }
        alt="Your background"
        className={classes.img}
      />
    </div>
  );
}

export default Background;
