import { useMutation } from "@apollo/client";
import { GET_FRIEND_REQUESTS, GET_FRIEND_STATUS } from "../../graphql/queries";
import { ACCEPT_REQUEST } from "../../graphql/mutations";
import { FriendRequest, FriendRequestsData } from "../../types";
import { Status } from "../../enums";

interface Props {
  userId: string;
}

export function useAcceptRequest({ userId }: Props) {
  const [acceptRequest] = useMutation(ACCEPT_REQUEST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleAcceptRequest() {
    return acceptRequest({
      variables: { userId },
      update: (store) => {
        store.writeQuery({
          query: GET_FRIEND_STATUS,
          variables: { userId },
          data: {
            friendStatus: {
              status: Status.FRIENDS,
            },
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

  return { handleAcceptRequest };
}
