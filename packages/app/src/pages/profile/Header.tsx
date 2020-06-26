import React from "react";
import { createStyles, Theme, Typography } from "@material-ui/core";
import FriendButton from "./header/FriendButton";
import { makeStyles } from "@material-ui/core/styles";
import Background from "./header/Background";
import OwnMenu from "./OwnMenu";
import ChatButton from "./header/ChatButton";
import { useParams } from "react-router-dom";
import { useProfileHeader } from "../../hooks/useProfileHeader";
import MyAvatar from "./header/MyAvatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      width: "100%",
      padding: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    grid: {
      borderColor: "red",
      borderStyle: "solid",
      borderWidth: "10px",
    },
    images: {
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
    imagesWrapper: {
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

function ProfileHeader() {
  const classes = useStyles();
  const { id } = useParams();
  const { user } = useProfileHeader({ id });

  return (
    <div className={classes.root}>
      <Background background={user.background} />
      <MyAvatar avatar={user.avatar} />
      <div className={classes.name}>
        <Typography align="center" variant="h2">
          {user.fullName}
        </Typography>
      </div>
      <OwnMenu />
      {/* {meId !== id && ( */}
      <div>
        <FriendButton userId={id} />
        <ChatButton userId={id} />
      </div>
      {/* )} */}
    </div>
  );
}

export default ProfileHeader;
