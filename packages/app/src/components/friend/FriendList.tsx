import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "../../graphql/queries";
import {
  Avatar,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { UserPreview } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  id?: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    friend: {
      // display: "flex",
      // alignContent: "center",
      // margin: "0 auto",
      textAlign: "center",
    },
    avatar: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

function FriendList({ id }: Props) {
  const classes = useStyles();
  const { data } = useQuery(GET_FRIENDS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    variables: { id },
  });

  if (!data?.friends) return null;

  return (
    <div>
      <Typography variant="h5" align="center">
        Friends
      </Typography>
      <List>
        {data.friends.map((friend: UserPreview) => (
          <ListItem key={friend.id}>
            <ListItemAvatar>
              <Link to={`/users/${friend.id}`}>
                <Avatar src={friend.avatar} alt="Friend's avatar" />
              </Link>
            </ListItemAvatar>

            <Link to={`/users/${friend.id}`}>
              <ListItemText
                primary={`${friend.firstName} ${friend.lastName}`}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default FriendList;
