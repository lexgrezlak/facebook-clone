import { useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/queries";
import { UserData, FriendshipStatus } from "../../types";
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
        const { user } = store.readQuery({
          query: GET_USER,
          variables: { id: userId },
        }) as UserData;

        store.writeQuery({
          query: GET_USER,
          variables: { id: userId },
          data: {
            user: {
              ...user,
              friendshipStatus: FriendshipStatus.Stranger,
            },
          },
        });
      },
    });
  }

  return { handleRejectRequest };
}
