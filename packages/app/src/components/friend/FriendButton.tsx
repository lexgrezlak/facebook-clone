import React from "react";
import { Button } from "@material-ui/core";
import { useFriendButtonManagement } from "../../hooks/useFriendButtonManagement";
import { FriendshipStatus, MeData } from "../../types";
import { GET_ME } from "../../graphql/queries";

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
    case FriendshipStatus.STRANGER:
      handleClick = handleSendRequest;
      text = "Add friend";
      break;
    case FriendshipStatus.FRIEND:
      handleClick = handleUnfriend;
      text = "Unfriend";
      break;
    case FriendshipStatus.ME_SENT_REQUEST:
      handleClick = handleCancelRequest;
      text = "Cancel request";
      break;
    case FriendshipStatus.ME_RECEIVED_REQUEST:
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
