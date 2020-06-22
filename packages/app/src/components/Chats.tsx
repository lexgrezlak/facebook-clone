import React, { useState } from "react";
import { ChatPreview } from "../types";
import { useQuery } from "@apollo/client";
import { GET_CHATS } from "../graphql/queries";
import { IconButton, Popover } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatList from "./ChatList";

interface ChatsData {
  chats: ChatPreview[];
}

export default function Chat() {
  const { data } = useQuery<ChatsData>(GET_CHATS, {
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
    <div>
      <IconButton
        aria-label="show chats"
        edge="end"
        color="inherit"
        onClick={handleClick}
      >
        <ChatBubbleIcon fontSize="large" />
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
        <ChatList chats={data?.chats || []} />
      </Popover>
    </div>
  );
}
