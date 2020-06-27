import { useMutation } from "@apollo/client";
import { GET_USER } from "../../graphql/queries";
import { ACCEPT_REQUEST } from "../../graphql/mutations";
import { UserData, FriendshipStatus } from "../../types";

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
      optimisticResponse: {
        acceptRequest: true,
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
              friendshipStatus: FriendshipStatus.Friend,
            },
          },
        });
      },
    });
  }

  return { handleAcceptRequest };
}
