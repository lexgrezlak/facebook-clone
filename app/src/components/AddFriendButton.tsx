import React from "react";
import { Button } from "@material-ui/core";
import { useAddFriendButtonManagement } from "../hooks/useAddFriendButtonManagement";

interface Props {
  id: number;
}

function AddFriendButton({ id }: Props) {
  const { addFriend, removeFriend, isFriend } = useAddFriendButtonManagement({
    id,
  });

  if (isFriend === null) return null;

  return (
    <Button variant="contained" onClick={isFriend ? removeFriend : addFriend}>
      {isFriend ? "Remove friend" : "Add friend"}
    </Button>
  );
}

export default AddFriendButton;
