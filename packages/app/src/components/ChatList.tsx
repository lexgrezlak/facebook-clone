import React from "react";
import { useQuery } from "@apollo/client";
import { ChatPreview } from "../types";
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
import { Link } from "react-router-dom";

interface ChatsData {
  chats: ChatPreview[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  link: {
    textDecoration: "none",

    "&:visited": {
      color: "inherit",
    },
  },

  item: {
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  content: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
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

  return (
    <List className={classes.root}>
      {data.chats.map(({ id, users, lastMessage }) => (
        <Link to={`/chats/${id}`} key={id} className={classes.link}>
          <ListItem className={classes.item}>
            <ListItemAvatar>
              <Avatar src={users[0].avatar} />
            </ListItemAvatar>
            <ListItemText
              className={classes.content}
              primary={users[0].fullName}
              secondary={lastMessage.content}
            />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
