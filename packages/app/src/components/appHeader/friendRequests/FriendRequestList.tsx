import React from "react";
import FriendRequestItem from "./FriendRequestItem";
import { CircularProgress, List } from "@material-ui/core";
import { FriendRequest } from "../../../types";
import EmptyList from "../../EmptyList";

interface Props {
  friendRequests: FriendRequest[] | undefined;
}

function FriendRequestList({ friendRequests }: Props) {
  if (!friendRequests) return <CircularProgress />;

  if (friendRequests.length === 0)
    return <EmptyList text="0 friend requests" />;

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
