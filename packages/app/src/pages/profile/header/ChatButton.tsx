import React from "react";
import { Button } from "@material-ui/core";
import { useCreateChat } from "../../../hooks/chat/useCreateChat";

interface Props {
  userId: string;
}

export default function ChatButton({ userId }: Props) {
  const { handleCreateChat } = useCreateChat({ userId });

  return (
    <div>
      <Button variant="contained" onClick={handleCreateChat}>
        Message
      </Button>
    </div>
  );
}
