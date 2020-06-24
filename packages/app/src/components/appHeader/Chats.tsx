import React, { useState } from "react";
import { ChatsData } from "../../types";
import { useQuery } from "@apollo/client";
import { GET_CHATS } from "../../graphql/queries";
import { IconButton, Popover, Badge } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatList from "./chats/ChatList";
import { useChats } from "../../hooks/useChats";
import usePopover from "../../hooks/usePopover";

export default function Chats() {
  // get chats query and
  // message received subscription with cache update
  const { chats } = useChats();
  const amountOfUnreadChats = chats.filter((chat) => chat.unread).length;

  const { handleClick, handleClose, open, anchorEl, id } = usePopover({
    name: "friend-requests",
  });

  return (
    <div>
      <IconButton
        aria-label="show chats"
        edge="end"
        color="inherit"
        onClick={handleClick}
      >
        <Badge color="secondary" badgeContent={amountOfUnreadChats}>
          <ChatBubbleIcon fontSize="large" />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ChatList chats={chats} />
      </Popover>
    </div>
  );
}
