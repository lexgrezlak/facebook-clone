import React from "react";
import { Button } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { GET_IS_FRIEND, REMOVE_FRIENDSHIP, SEND_INVITATION } from "../queries";

interface Props {
  id: number;
}

function AddFriendButton({ id }: Props) {
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

  const [removeFriendship] = useMutation(REMOVE_FRIENDSHIP, {
    onError: (error) => [console.log(error.graphQLErrors[0].message)],
  });

  if (!data) return null;

  async function addFriend(id: number) {
    const res = await sendInvitation({ variables: { id: Number(id) } });
    console.log(res);
  }

  async function removeFriend(id: number) {
    const res = await removeFriendship({ variables: { id: Number(id) } });
    console.log(res);
  }

  const { isFriend } = data;
  console.log(data);

  return !isFriend ? (
    <Button variant="contained" onClick={() => addFriend(id)}>
      Add friend
    </Button>
  ) : (
    <Button variant="contained" onClick={() => removeFriend(id)}>
      Remove friend
    </Button>
  );
}

export default AddFriendButton;
