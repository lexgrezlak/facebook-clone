import React from "react";
import { Button } from "@material-ui/core";
import { useFriendButtonManagement } from "../hooks/useFriendButtonManagement";

interface Props {
  id: number;
}

interface ActionProps {
  handleClick: () => void;
}

const AddButton = ({ handleClick }: ActionProps) => (
  <Button variant="contained" onClick={handleClick}>
    Add friend
  </Button>
);

const RemoveButton = ({ handleClick }: ActionProps) => (
  <Button variant="contained" onClick={handleClick}>
    Remove friend
  </Button>
);

const CancelButton = ({ handleClick }: ActionProps) => (
  <Button variant="contained" onClick={handleClick}>
    Cancel request
  </Button>
);

function FriendButton({ id }: Props) {
  const {
    addFriend,
    removeFriend,
    isFriend,
    cancelRequest,
  } = useFriendButtonManagement({
    id,
  });

  // null is strangers
  // true is friends
  // false is pending
  switch (isFriend) {
    case null:
      return <AddButton handleClick={addFriend} />;
    case true:
      return <RemoveButton handleClick={removeFriend} />;
    case false:
      return <CancelButton handleClick={cancelRequest} />;
  }
}

export default FriendButton;
