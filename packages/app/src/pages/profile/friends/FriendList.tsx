import React from "react";
import { List } from "@material-ui/core";
import { UserPreview } from "../../../types";
import FriendItem from "./FriendItem";

interface Props {
  friends: UserPreview[];
}

function FriendList({ friends }: Props) {
  return (
    <div>
      <List>
        {friends.map((friend: UserPreview) => (
          <FriendItem friend={friend} key={friend.id} />
        ))}
      </List>
    </div>
  );
}

export default FriendList;
