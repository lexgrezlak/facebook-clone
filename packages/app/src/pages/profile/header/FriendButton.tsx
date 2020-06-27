import React from "react";
import { Button } from "@material-ui/core";
import { FriendshipStatus } from "../../../types";
import { useFriendButton } from "../../../hooks/friend/useFriendButton";
import { useParams } from "react-router";
import { useFriendshipStatus } from "../../../hooks/friend/useFriendshipStatus";

function FriendButton() {
  const { id: userId } = useParams();

  const {
    handleSendRequest,
    handleUnfriend,
    handleCancelRequest,
    handleAcceptRequest,
  } = useFriendButton({
    userId,
  });

  const friendshipStatus = useFriendshipStatus({ userId });

  let handleClick;
  let text;

  switch (friendshipStatus) {
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
