import React, { useState } from "react";
import { ChatPreview, Message, ChatsData } from "../types";
import { useQuery, useSubscription, useApolloClient } from "@apollo/client";
import { GET_CHATS } from "../graphql/queries";
import { IconButton, Popover, Badge } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatList from "./ChatList";
import { MESSAGE_RECEIVED } from "../graphql/subscriptions";

interface MessageReceivedData {
  messageReceived: Message;
}

export default function Chat() {
  const client = useApolloClient();
  const { data } = useQuery<ChatsData>(GET_CHATS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useSubscription<MessageReceivedData>(MESSAGE_RECEIVED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const messageReceived = subscriptionData.data?.messageReceived;

      if (messageReceived) {
        const { chats } = client.readQuery({ query: GET_CHATS }) as ChatsData;
        const messageReceivedChat = {
          ...chats.find((chat) => chat.id === messageReceived.chatId),
          lastMessage: messageReceived,
        };

        const otherChats = chats.filter(
          (chat) => chat.id !== messageReceived.chatId
        );

        const updatedChats = [messageReceivedChat, ...otherChats];

        client.writeQuery({
          query: GET_CHATS,
          data: {
            chats: updatedChats,
          },
        });
      }
    },
  });

  const chats = data?.chats || [];
  const amountOfUnreadChats = chats.filter((chat) => chat.unread).length;

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
