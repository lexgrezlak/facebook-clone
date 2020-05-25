import { useMutation } from "@apollo/client";
import { GET_FRIEND_STATUS, REMOVE_REQUEST } from "../../queries";

interface Props {
  id: number;
}

export function useCancel({ id }: Props) {
  const [removeRequest] = useMutation(REMOVE_REQUEST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function cancelRequest() {
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
      },
    });
  }

  return { cancelRequest };
}
