import React from "react";
import { ChatPreview } from "../types";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  link: {
    textDecoration: "none",

    "& > *": {
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    },

    "&:visited": {
      color: "inherit",
    },
  },

  unreadItem: {
    backgroundColor: "#f6f6f6",

    // the name of the user
    "& span": {
      fontWeight: "bold",
    },

    // the message content
    "& p": {
      fontWeight: "bold",
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
      {chats.map(({ id, users, lastMessage, unread }) => (
        <Link to={`/chats/${id}`} key={id} className={classes.link}>
          <ListItem className={unread ? classes.unreadItem : ""}>
            <ListItemAvatar>
              <Avatar src={users[0].avatar} />
            </ListItemAvatar>
            <ListItemText
              className={classes.content}
              primary={users[0].fullName}
              secondary={lastMessage.content}
            />
            <Typography variant="caption" gutterBottom>
              <Moment format="HH:mm" date={lastMessage.sentTime} />
            </Typography>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
