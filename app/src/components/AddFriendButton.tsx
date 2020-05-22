import React from "react";
import { Button } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { SEND_INVITATION } from "../queries";

interface Props {
  id: number;
}

function AddFriendButton({ id }: Props) {
  const [sendInvitation] = useMutation(SEND_INVITATION, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function addFriend(id: number) {
    const res = await sendInvitation({ variables: { id: Number(id) } });
    console.log(res);
  }

  return (
    <Button variant="contained" onClick={() => addFriend(id)}>
      Add friend
    </Button>
  );
}

export default AddFriendButton;
