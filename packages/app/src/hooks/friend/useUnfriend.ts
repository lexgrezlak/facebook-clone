import { UserData } from "./../../types";
import { GET_USER } from "./../../graphql/queries";
import { useMutation } from "@apollo/client";
import { UNFRIEND } from "../../graphql/mutations";
import { FriendshipStatus } from "../../types";

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
        const { user } = store.readQuery({
          query: GET_USER,
          variables: { id: userId },
        }) as UserData;

        store.writeQuery({
          query: GET_USER,
          variables: { userId },
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

  return { handleUnfriend };
}
