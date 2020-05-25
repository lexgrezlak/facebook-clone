import { useMutation } from "@apollo/client";
import { GET_FRIEND_STATUS, SEND_INVITATION } from "../../queries";

interface Props {
  id: number;
  userId: number;
}

export function useAdd({ id, userId }: Props) {
  const [sendInvitation] = useMutation(SEND_INVITATION, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function addFriend() {
    await sendInvitation({
      variables: { id },
      update: (store, { data: { sendInvitation } }) => {
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

  return { addFriend };
}
