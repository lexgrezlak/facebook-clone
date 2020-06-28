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
import Moment from "react-moment";

interface Props {
  notification: Notification;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function NotificationItem({ notification }: Props) {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <ListItemAvatar>
        <Avatar src={notification.user.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={`${notification.user.fullName} ${
          notification.type === NotificationType.PostLiked
            ? "liked"
            : "commented"
        } your post!`}
        secondary={<Moment fromNow date={notification.receivedAt} />}
      />
    </ListItem>
  );
}
