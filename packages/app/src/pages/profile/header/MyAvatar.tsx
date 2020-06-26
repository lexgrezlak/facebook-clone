import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { StyledProfileAvatar } from "../../../styled/StyledProfileAvatar";

interface Props {
  avatar: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      alignSelf: "flex-start",
      width: "100%",
      position: "relative",
    },
    name: {
      width: "100%",
    },
    wrapper: {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      "& > *": {
        margin: theme.spacing(1),
      },
      zIndex: 999,
    },
  })
);

export default function MyAvatar({ avatar }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {/* {meId === id ? ( */}
        {/* <OwnAvatar /> */}
        {/* ) : ( */}
        <StyledProfileAvatar src={avatar} alt={"Avatar"} />
        {/* )} */}
      </div>
    </div>
  );
}
