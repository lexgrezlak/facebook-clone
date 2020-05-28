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
import { useRemoveRequest } from "../../hooks/FriendButtonManagement/useRemoveRequest";

interface Props {
  friendRequest: FriendRequest;
}

function FriendRequestItem({ friendRequest }: Props) {
  const {
    sender: { avatar, firstName, lastName, id },
    sentTime,
  } = friendRequest;

  const { handleAcceptRequest } = useAcceptRequest({ id });
  const { handleRemoveRequest } = useRemoveRequest({ id });

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={avatar} alt="Person's avatar" />
      </ListItemAvatar>
      <div>
        <ListItemText
          primary={`${firstName} ${lastName}`}
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
