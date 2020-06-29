import React from "react";
import { List, makeStyles, createStyles } from "@material-ui/core";
import { UserPreview } from "../../../types";
import FriendItem from "./FriendItem";

interface Props {
  friends: UserPreview[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

function FriendList({ friends }: Props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {friends.map((friend: UserPreview) => (
        <FriendItem friend={friend} key={friend.id} />
      ))}
    </List>
  );
}

export default FriendList;
