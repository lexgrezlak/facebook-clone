import React from "react";
import { Message } from "../../types";
import MessageItem from "./MessageItem";
import { List } from "@material-ui/core";

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  return (
    <List>
      {messages.map((message) => (
        <MessageItem message={message} key={message.id} />
      ))}
    </List>
  );
}
