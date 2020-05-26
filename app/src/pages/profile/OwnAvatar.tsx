import React from "react";
import { GET_ME } from "../../queries";
import { useApolloClient } from "@apollo/client";
import { Avatar, Badge, createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AvatarUpload from "../../components/AvatarUpload";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    avatar: {
      border: "thick solid #f0f0f0",
      width: "100%",
      height: "100%",
    },
    badge: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  })
);

function OwnAvatar() {
  const classes = useStyles();
  const client = useApolloClient();
  const data = client.readQuery({ query: GET_ME });
  const { avatar } = data.me;

  return (
    <div className={classes.root}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={<AvatarUpload />}
        className={classes.badge}
      >
        <Avatar alt="Your avatar" src={avatar} className={classes.avatar} />
      </Badge>
    </div>
  );
}

export default OwnAvatar;
