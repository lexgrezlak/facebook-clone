import { useMutation, useQuery } from "@apollo/client";
import { GET_IS_FRIEND, REMOVE_FRIENDSHIP, SEND_INVITATION } from "../queries";

interface Props {
  id: number;
}

export const useAddFriendButtonManagement = ({ id }: Props) => {
  const { data } = useQuery(GET_IS_FRIEND, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    variables: { id },
  });

  const [sendInvitation] = useMutation(SEND_INVITATION, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function addFriend() {
    return sendInvitation({ variables: { id } });
  }

  const [removeFriendship] = useMutation(REMOVE_FRIENDSHIP, {
    onError: (error) => [console.log(error.graphQLErrors[0].message)],
  });

  async function removeFriend() {
    return removeFriendship({ variables: { id } });
  }

  const isFriend = data?.isFriend ?? null;

  return { isFriend, addFriend, removeFriend };
};
