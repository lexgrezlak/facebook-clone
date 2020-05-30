import { useMutation } from "@apollo/client";
import { GET_FRIEND_STATUS } from "../../graphql/queries";
import { REMOVE_FRIEND } from "../../graphql/mutations";

interface Props {
  id: string;
}

export function useRemoveFriend({ id }: Props) {
  const [removeFriend] = useMutation(REMOVE_FRIEND, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleRemoveFriend() {
    return removeFriend({
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

  return { handleRemoveFriend };
}
