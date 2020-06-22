import React from "react";
import { ChatPreview } from "../types";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

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

interface Props {
  chats: ChatPreview[];
}

export default function ChatList({ chats }: Props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {chats.map(({ id, users, lastMessage }) => (
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
