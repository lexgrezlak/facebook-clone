import React, { useState } from "react";
import { Badge, createStyles, IconButton, Popover } from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import FriendRequestList from "./friend/FriendRequestList";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { FriendRequestsData } from "../types";
import { GET_FRIEND_REQUESTS } from "../graphql/queries";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(1),
    },
  })
);

function FriendRequests() {
  const classes = useStyles();
  const { data } = useQuery<FriendRequestsData>(GET_FRIEND_REQUESTS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "friend-requests" : undefined;

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="friend request list"
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={data?.friendRequests.length} color="secondary">
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
        <FriendRequestList friendRequests={data?.friendRequests} />
      </Popover>
    </div>
  );
}

export default FriendRequests;
