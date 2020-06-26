import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "../../../graphql/queries";
import {
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import { UserPreview } from "../../../types";
import { Link, useParams } from "react-router-dom";
import { useFriends } from "../../../hooks/useFriends";

interface FriendsData {
  otherFriends: UserPreview[];
  commonFriends: UserPreview[];
}

interface FriendsVars {
  userId: string;
}

function FriendList() {
  const { id } = useParams();
  const { friends, friendsCount, commonFriendsCount } = useFriends({ id });

  return (
    <div>
      <Typography variant="h5" align="center">
        {friendsCount} {friendsCount === 1 ? "friend" : "friends"} (
        {commonFriendsCount} common)
      </Typography>
      <List>
        {friends.map((friend: UserPreview) => (
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
        ))}
      </List>
    </div>
  );
}

export default FriendList;
