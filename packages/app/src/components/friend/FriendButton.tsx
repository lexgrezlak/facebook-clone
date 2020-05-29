import React from "react";
import { Button } from "@material-ui/core";
import { useFriendButtonManagement } from "../../hooks/useFriendButtonManagement";
import { IsFriend } from "../../types";

interface Props {
  id: number;
}

function FriendButton({ id }: Props) {
  const {
    handleAddFriend,
    handleRemoveFriend,
    isFriend,
    handleRemoveRequest,
    handleAcceptRequest,
  } = useFriendButtonManagement({
    id,
  });

  let handleClick;
  let text;

  switch (isFriend) {
    case IsFriend.IsNot:
      handleClick = handleAddFriend;
      text = "Add friend";
      break;
    case IsFriend.Is:
      handleClick = handleRemoveFriend;
      text = "Remove friend";
      break;
    case IsFriend.MeSentRequest:
      handleClick = handleRemoveRequest;
      text = "Cancel request";
      break;
    case IsFriend.MeReceivedRequest:
      handleClick = handleAcceptRequest;
      text = "Accept request";
      break;
  }

  return (
    <Button variant="contained" onClick={handleClick}>
      {text}
    </Button>
  );
}

export default FriendButton;
