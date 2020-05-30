import React from "react";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import Moment from "react-moment";
import { FriendRequest } from "../../types";
import { useAcceptRequest } from "../../hooks/FriendButtonManagement/useAcceptRequest";
import { useCancelRequest } from "../../hooks/FriendButtonManagement/useCancelRequest";

interface Props {
  friendRequest: FriendRequest;
}

function FriendRequestItem({ friendRequest }: Props) {
  const {
    fromUser: { avatar, fullName, id: userId },
    sentTime,
  } = friendRequest;

  const { handleAcceptRequest } = useAcceptRequest({ userId });
  const { handleCancelRequest } = useCancelRequest({ userId });

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={avatar} alt="Person's avatar" />
      </ListItemAvatar>
      <div>
        <ListItemText
          primary={fullName}
          secondary={<Moment fromNow date={sentTime} />}
        />
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAcceptRequest}
            size={"small"}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRemoveRequest}
            size="small"
          >
            Remove
          </Button>
        </div>
      </div>
    </ListItem>
  );
}

export default FriendRequestItem;
