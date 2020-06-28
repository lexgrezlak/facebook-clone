import React from "react";
import { UserPreview } from "../../../types";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  friend: UserPreview;
}

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  })
);

export default function FriendItem({ friend }: Props) {
  const classes = useStyles();

  return (
    <ListItem key={friend.id}>
      <ListItemAvatar>
        <Link to={`/users/${friend.id}`}>
          <Avatar src={friend.avatar} alt="Friend's avatar" />
        </Link>
      </ListItemAvatar>
      <Link to={`/users/${friend.id}`} className={classes.link}>
        <ListItemText primary={friend.fullName} />
      </Link>
    </ListItem>
  );
}
