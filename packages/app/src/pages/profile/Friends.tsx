import React from "react";
import FriendList from "./friends/FriendList";
import { useParams } from "react-router";
import { useFriends } from "../../hooks/useFriends";
import { Typography } from "@material-ui/core";

export default function Friends() {
  const { id } = useParams();
  const { friends, friendsCount, commonFriendsCount } = useFriends({ id });

  return (
    <div>
      <Typography variant="h5" align="center">
        {friendsCount} {friendsCount === 1 ? "friend" : "friends"} (
        {commonFriendsCount} common)
      </Typography>
      <FriendList friends={friends} />
    </div>
  );
}
