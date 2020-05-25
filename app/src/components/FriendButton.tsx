import React from "react";
import { Button } from "@material-ui/core";
import { useFriendButtonManagement } from "../hooks/useFriendButtonManagement";
import { IsFriend } from "../hooks/FriendButtonManagement/useIsFriend";

interface Props {
  id: number;
}

function FriendButton({ id }: Props) {
  const {
    addFriend,
    removeFriend,
    isFriend,
    cancelRequest,
    acceptRequest,
  } = useFriendButtonManagement({
    id,
  });

  let handleClick;
  let text;

  switch (isFriend) {
    case IsFriend.IsNot:
      handleClick = addFriend;
      text = "Add friend";
      break;
    case IsFriend.Is:
      handleClick = removeFriend;
      text = "Remove friend";
      break;
    case IsFriend.MeSentRequest:
      handleClick = cancelRequest;
      text = "Cancel request";
      break;
    case IsFriend.MeReceivedRequest:
      handleClick = acceptRequest;
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
