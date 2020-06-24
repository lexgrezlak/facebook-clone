import React from "react";
import FriendRequestItem from "./FriendRequestItem";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { FriendRequest } from "../../../types";

interface Props {
  friendRequests: FriendRequest[] | undefined;
}

function EmptyList() {
  return (
    <List>
      <ListItem>
        <ListItemText primary="0 friend requests remaining" />
      </ListItem>
    </List>
  );
}

function FriendRequestList({ friendRequests }: Props) {
  if (!friendRequests) return <CircularProgress />;

  if (friendRequests.length === 0) return <EmptyList />;

  return (
    <List>
      {friendRequests.map((friendRequest) => (
        <FriendRequestItem
          key={friendRequest.id}
          friendRequest={friendRequest}
        />
      ))}
    </List>
  );
}

export default FriendRequestList;
