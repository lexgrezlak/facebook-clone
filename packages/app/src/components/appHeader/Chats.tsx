import React from "react";
import { IconButton, Popover, Badge } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatList from "./chats/ChatList";
import { useChats } from "../../hooks/chat/useChats";
import usePopover from "../../hooks/usePopover";

export default function Chats() {
  const { chats, amountOfUnreadChats } = useChats();
  const { handleClick, handleClose, open, anchorEl, id } = usePopover({
    name: "chats",
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
