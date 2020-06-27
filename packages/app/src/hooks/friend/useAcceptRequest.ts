import { FriendRequestsData } from "./../../types";
import { GET_FRIEND_REQUESTS } from "./../../graphql/queries";
import { useMutation } from "@apollo/client";
import { ACCEPT_REQUEST } from "../../graphql/mutations";

interface Props {
  userId: string;
}

interface AcceptRequestData {
  acceptRequest: boolean;
}

export function useAcceptRequest({ userId }: Props) {
  const [acceptRequest] = useMutation<AcceptRequestData>(ACCEPT_REQUEST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleAcceptRequest() {
    return acceptRequest({
      variables: { userId },
      optimisticResponse: {
        acceptRequest: true,
      },
      update: (store) => {
        const { friendRequests } = store.readQuery({
          query: GET_FRIEND_REQUESTS,
        }) as FriendRequestsData;

        store.writeQuery({
          query: GET_FRIEND_REQUESTS,
          data: {
            friendRequests: friendRequests.filter(
              (request) => request.fromUser.id !== userId
            ),
          },
        });
      },
    });
  }

  return { handleAcceptRequest };
}
