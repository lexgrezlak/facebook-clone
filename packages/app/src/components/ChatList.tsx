import React from "react";
import { useQuery } from "@apollo/client";
import { UserPreview } from "../types";
import { GET_CHATS } from "../graphql/queries";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

interface MessagePreview {
  content: string;
}

interface ChatPreview {
  id: string;
  users: UserPreview[];
  messages: MessagePreview[];
}

interface ChatsData {
  chats: ChatPreview[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ChatList() {
  const classes = useStyles();

  const { data } = useQuery<ChatsData>(GET_CHATS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (!data?.chats) return <CircularProgress />;

  console.log(data.chats);

  return (
    <List className={classes.root}>
      {data.chats.map(({ id, users, messages }) => (
        <ListItem key={id}>
          <ListItemAvatar>
            <Avatar src={users[0].avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={users[0].fullName}
            secondary={messages[0].content}
          />
        </ListItem>
      ))}
    </List>
  );
}
