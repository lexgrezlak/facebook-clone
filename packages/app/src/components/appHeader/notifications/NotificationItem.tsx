import React from "react";
import { Notification } from "../../../types";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { NotificationType } from "../../../enums";
import { Link } from "react-router-dom";

interface Props {
  notification: Notification;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    link: {
      textDecoration: "none",
      color: "inherit",
      "& > *": {
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      },
    },
  })
);

export default function NotificationItem({ notification }: Props) {
  const classes = useStyles();

  return (
    <Link to={`/posts/${notification.postId}`} className={classes.link}>
      <ListItem className={classes.root}>
        <ListItemAvatar>
          <Avatar src={notification.user.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={notification.user.fullName}
          secondary={`${
            notification.type === NotificationType.PostLiked
              ? "liked"
              : "commented"
          } your post!`}
        />
      </ListItem>
    </Link>
  );
}
