import React from "react";
import MyTextField from "./MyTextField";
import { UserPreview } from "../types";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHATS } from "../graphql/queries";
import { CircularProgress } from "@material-ui/core";

interface ChatPreview {
  id: string;
  users: UserPreview[];
}

interface ChatsData {
  chats: ChatPreview[];
}

export default function Chat() {
  const { data } = useQuery<ChatsData>(GET_CHATS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (!data?.chats) return <CircularProgress />;

  return (
    <div>
      {data.chats.map(({ id, users }) => (
        <div key={id}>{JSON.stringify(users)}</div>
      ))}
    </div>
  );
}
