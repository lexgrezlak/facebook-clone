import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "../queries";

function FriendList() {
  const { data } = useQuery(GET_FRIENDS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  return (
    <ul>
      {data?.friends?.map((friend: any) => (
        <li>friend.firstName</li>
      ))}
    </ul>
  );
}

export default FriendList;
