import React from "react";
import { Badge, createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BackgroundUpload from "../../components/BackgroundUpload";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      height: 200,
      "& > *": {
        margin: theme.spacing(1),
      },
    },

    img: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
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
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={<BackgroundUpload />}
        className={classes.img}
      >
        <img src={background} alt="Your background" className={classes.img} />
      </Badge>
    </div>
  );
}

export default OwnBackground;
