import { useMutation } from "@apollo/client";
import { GET_FRIEND_STATUS, REMOVE_FRIENDSHIP } from "../../queries";

interface Props {
  id: number;
}

export function useRemove({ id }: Props) {
  const [removeFriendship] = useMutation(REMOVE_FRIENDSHIP, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function removeFriend() {
    return removeFriendship({
      variables: { id },
      update: (store, { data }) => {
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

  return { removeFriend };
}
