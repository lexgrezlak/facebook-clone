import { useMutation } from "@apollo/client";
import { GET_FRIEND_REQUESTS, GET_FRIEND_STATUS } from "../../graphql/queries";
import { ACCEPT_REQUEST } from "../../graphql/mutations";
import { FriendRequest, FriendRequestsData } from "../../types";

interface Props {
  id: number;
}

export function useAcceptRequest({ id }: Props) {
  const [acceptRequest] = useMutation(ACCEPT_REQUEST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleAcceptRequest() {
    return acceptRequest({
      variables: { id },
      update: (store) => {
        store.writeQuery({
          query: GET_FRIEND_STATUS,
          variables: { id },
          data: {
            friendStatus: 1,
          },
        });

        const data = store.readQuery({
          query: GET_FRIEND_REQUESTS,
        }) as FriendRequestsData;
        store.writeQuery({
          query: GET_FRIEND_REQUESTS,
          data: {
            friendRequests: data.friendRequests.filter(
              (friendRequest: FriendRequest) => friendRequest.sender.id !== id
            ),
          },
        });
      },
    });
  }

  return { handleAcceptRequest };
}
