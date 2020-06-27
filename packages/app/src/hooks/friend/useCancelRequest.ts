import { FriendshipStatus, UserData } from "./../../types";
import { useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/queries";
import { CANCEL_REQUEST } from "../../graphql/mutations";

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
      optimisticResponse: {
        cancelRequest: true,
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

  return { handleCancelRequest };
}
