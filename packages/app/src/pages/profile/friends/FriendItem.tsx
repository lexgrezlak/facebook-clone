import React from "react";
import { UserPreview } from "../../../types";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  friend: UserPreview;
}

export default function FriendItem({ friend }: Props) {
  return (
    <ListItem key={friend.id}>
      <ListItemAvatar>
        <Link to={`/users/${friend.id}`}>
          <Avatar src={friend.avatar} alt="Friend's avatar" />
        </Link>
      </ListItemAvatar>
      <Link to={`/users/${friend.id}`}>
        <ListItemText primary={friend.fullName} />
      </Link>
    </ListItem>
  );
}
