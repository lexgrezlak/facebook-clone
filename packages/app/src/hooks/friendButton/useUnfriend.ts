import { useMutation } from "@apollo/client";
import { GET_FRIEND_STATUS } from "../../graphql/queries";
import { UNFRIEND } from "../../graphql/mutations";

interface Props {
  userId: string;
}

export function useUnfriend({ userId }: Props) {
  const [unfriend] = useMutation(UNFRIEND, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleUnfriend() {
    return unfriend({
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

  return { handleUnfriend };
}
