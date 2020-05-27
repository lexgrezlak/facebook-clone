import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "../../graphql/queries";
import { Avatar, Typography } from "@material-ui/core";
import { UserPreview } from "../../types";

interface Props {
  id?: number;
}

function FriendList({ id }: Props) {
  const { data } = useQuery(GET_FRIENDS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    variables: { id },
  });

  if (!data?.friends) return null;

  return (
    <div>
      <Typography variant="h5">Friends</Typography>
      <ul>
        {data.friends.map((friend: UserPreview) => (
          <li key={friend.id}>
            <Avatar src={friend.avatar} alt="Friend's avatar" />
            {friend.firstName} {friend.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;
