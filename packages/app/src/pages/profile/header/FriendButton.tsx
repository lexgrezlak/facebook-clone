import React from "react";
import { Button } from "@material-ui/core";
import { useFriendButtonManagement } from "../../../hooks/useFriendButtonManagement";
import { FriendshipStatus } from "../../../types";

interface Props {
  userId: string;
}

function FriendButton({ userId }: Props) {
  const {
    handleSendRequest,
    handleUnfriend,
    isFriend,
    handleCancelRequest,
    handleAcceptRequest,
  } = useFriendButtonManagement({
    userId,
  });

  let handleClick;
  let text;

  switch (isFriend) {
    case FriendshipStatus.Stranger:
      handleClick = handleSendRequest;
      text = "Add friend";
      break;
    case FriendshipStatus.Friend:
      handleClick = handleUnfriend;
      text = "Unfriend";
      break;
    case FriendshipStatus.MeSentRequest:
      handleClick = handleCancelRequest;
      text = "Cancel request";
      break;
    case FriendshipStatus.MeReceivedRequest:
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
