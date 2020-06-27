import React from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { useChat } from "../hooks/chat/useChat";
import CreateMessageForm from "./chat/CreateMessageForm";
import MessageList from "./chat/MessageList";
import Members from "./chat/Members";

export default function Chat() {
  const { id: chatId } = useParams();
  const { chat } = useChat({ chatId });

  if (!chat) return <CircularProgress />;

  const { messages, users } = chat;

  return (
    <div>
      <Members users={users} />
      <MessageList messages={messages} />
      <CreateMessageForm chatId={chatId} />
    </div>
  );
}
