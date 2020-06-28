import React from "react";
import { Message } from "../../types";
import {
  ListItem,
  Avatar,
  ListItemText,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import Moment from "react-moment";
import { Link } from "react-router-dom";

interface Props {
  message: Message;
}

const useStyles = makeStyles(() =>
  createStyles({
    wrap: {
      wordWrap: "break-word",
    },
  })
);

export default function MessageItem({ message }: Props) {
  const classes = useStyles();
  return (
    <ListItem key={message.id}>
      <Link to={`/users/${message.user.id}`}>
        <Avatar src={message.user.avatar} />
      </Link>
      <ListItemText
        className={classes.wrap}
        primary={message.content}
        secondary={<Moment fromNow date={message.sentTime} />}
      />
    </ListItem>
  );
}
