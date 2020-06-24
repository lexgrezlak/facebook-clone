import React from "react";
import { Badge, createStyles, IconButton, Popover } from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import FriendRequestList from "./friendRequests/FriendRequestList";
import { makeStyles } from "@material-ui/core/styles";
import usePopover from "../../hooks/usePopover";
import useFriendRequests from "../../hooks/useFriendRequests";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(1),
    },
  })
);

function FriendRequests() {
  const classes = useStyles();
  const { friendRequests } = useFriendRequests();
  const { handleClick, handleClose, open, anchorEl, id } = usePopover({
    name: "friend-requests",
  });

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="friend request list"
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={friendRequests.length} color="secondary">
          <GroupAddIcon fontSize="large" />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <FriendRequestList friendRequests={friendRequests} />
      </Popover>
    </div>
  );
}

export default FriendRequests;
