import { useMutation } from "@apollo/client";
import { GET_FRIEND_REQUESTS } from "../../graphql/queries";
import { FriendRequestsData } from "../../types";
import { REJECT_REQUEST } from "../../graphql/mutations";

interface Props {
  userId: string;
}

interface RejectRequestData {
  rejectRequest: boolean;
}

interface RejectRequestVars {
  userId: string;
}

export function useRejectRequest({ userId }: Props) {
  const [rejectRequest] = useMutation<RejectRequestData, RejectRequestVars>(
    REJECT_REQUEST,
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
    }
  );

  async function handleRejectRequest() {
    return rejectRequest({
      variables: { userId },
      optimisticResponse: {
        rejectRequest: true,
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

  return { handleRejectRequest };
}
