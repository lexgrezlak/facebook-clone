import React from "react";
import BackgroundUpload from "./BackgroundUpload";
import ChatButton from "./ChatButton";
import FriendButton from "./FriendButton";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { useParams } from "react-router";
import { useMe } from "../../../hooks/useMe";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

export default function Menu() {
  const classes = useStyles();
  const { id } = useParams();
  const me = useMe();
  const isMyProfile = me.id === id;
  return (
    <div className={classes.root}>
      {isMyProfile ? (
        <BackgroundUpload />
      ) : (
        <>
          <FriendButton />
          <ChatButton />
        </>
      )}
    </div>
  );
}
