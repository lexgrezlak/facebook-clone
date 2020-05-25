import { useMutation } from "@apollo/client";
import { ACCEPT_INVITATION, GET_FRIEND_STATUS } from "../../queries";

interface Props {
  id: number;
}

export function useAccept({ id }: Props) {
  const [acceptInvitation] = useMutation(ACCEPT_INVITATION, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function acceptRequest() {
    return acceptInvitation({
      variables: { id },
      update: (store) => {
        store.writeQuery({
          query: GET_FRIEND_STATUS,
          variables: { id },
          data: {
            friendStatus: 1,
          },
        });
      },
    });
  }

  return { acceptRequest };
}
