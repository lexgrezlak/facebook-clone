import React, { useState } from "react";
import { UserPreview } from "../types";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_CHATS } from "../graphql/queries";
import { CircularProgress, IconButton, Popover } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import ChatList from "./ChatList";

export default function Chat() {
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
    <div>
      <IconButton
        aria-label="show chats"
        edge="end"
        color="inherit"
        onClick={handleClick}
      >
        <ChatIcon fontSize="large" />
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
        <ChatList />
      </Popover>
    </div>
  );
}
