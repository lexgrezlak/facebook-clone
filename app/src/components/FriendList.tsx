import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "../queries";
import { Typography } from "@material-ui/core";

function FriendList() {
  const { data } = useQuery(GET_FRIENDS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  return (
    <div>
      <Typography variant="h5">Friends</Typography>
      <ul>
        {data?.friends?.map((friend: any) => (
          <li key={friend.id}>
            {friend.firstName} {friend.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;
