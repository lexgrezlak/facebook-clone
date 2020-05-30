import { useMutation } from "@apollo/client";
import { GET_FRIEND_REQUESTS, GET_FRIEND_STATUS } from "../../graphql/queries";
import { CANCEL_REQUEST } from "../../graphql/mutations";
import { FriendRequest, FriendRequestsData } from "../../types";

interface Props {
  userId: string;
}

export function useCancelRequest({ userId }: Props) {
  const [cancelRequest] = useMutation(CANCEL_REQUEST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleCancelRequest() {
    return cancelRequest({
      variables: { userId },
      update: (store) => {
        store.writeQuery({
          query: GET_FRIEND_STATUS,
          variables: { userId },
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
              (friendRequest: FriendRequest) =>
                friendRequest.fromUser.id !== userId
            ),
          },
        });
      },
    });
  }

  return { handleCancelRequest };
}
