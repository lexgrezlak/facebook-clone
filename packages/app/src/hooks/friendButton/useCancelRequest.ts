import { useMutation } from "@apollo/client";
import { GET_FRIEND_STATUS } from "../../graphql/queries";
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
      update: (store) => {
        store.writeQuery({
          query: GET_FRIEND_STATUS,
          variables: { userId },
          data: {
            friendStatus: null,
          },
        });
      },
    });
  }

  return { handleCancelRequest };
}
