import { useQuery } from "@apollo/client";
import { FriendRequestsData } from "../types";
import { GET_FRIEND_REQUESTS } from "../graphql/queries";

export default function useFriendRequests() {
  const { data } = useQuery<FriendRequestsData>(GET_FRIEND_REQUESTS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const friendRequests = data?.friendRequests || [];

  return { friendRequests };
}
