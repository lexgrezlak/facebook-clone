import { useMutation } from "@apollo/client";
import { GET_FRIEND_REQUESTS, GET_FRIEND_STATUS } from "../../graphql/queries";
import { REMOVE_REQUEST } from "../../graphql/mutations";
import { FriendRequest, FriendRequestsData } from "../../types";

interface Props {
  id: number;
}

export function useRemoveRequest({ id }: Props) {
  const [removeRequest] = useMutation(REMOVE_REQUEST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleRemoveRequest() {
    return removeRequest({
      variables: { id },
      update: (store) => {
        store.writeQuery({
          query: GET_FRIEND_STATUS,
          variables: { id },
          data: {
            friendStatus: null,
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

  return { handleRemoveRequest };
}
