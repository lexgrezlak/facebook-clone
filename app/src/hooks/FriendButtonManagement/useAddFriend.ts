import { useMutation } from "@apollo/client";
import { GET_FRIEND_STATUS } from "../../graphql/queries";
import { ADD_FRIEND } from "../../graphql/mutations";

interface Props {
  id: number;
  userId: number;
}

export function useAddFriend({ id, userId }: Props) {
  const [addFriend] = useMutation(ADD_FRIEND, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleAddFriend() {
    await addFriend({
      variables: { id },
      update: (store) => {
        store.writeQuery({
          query: GET_FRIEND_STATUS,
          variables: { id },
          data: {
            friendStatus: {
              __typename: "FriendStatus",
              fromUserId: userId,
              statusId: 2,
            },
          },
        });
      },
    });
  }

  return { handleAddFriend };
}
