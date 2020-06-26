import React from "react";
import { ChatPreview } from "../../../types";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { getFormat } from "../../../utils";
import EmptyList from "../../EmptyList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
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
  chats: ChatPreview[] | undefined;
}

export default function ChatList({ chats }: Props) {
  const classes = useStyles();

  if (!chats) return <CircularProgress />;
  if (chats.length === 0) return <EmptyList text="0 chats" />;

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
              <Moment
                // HH:mm when less than 1 day has elapsed
                // DD/MM/YYYY when 1 day or more has elapsed
                format={getFormat(lastMessage.sentTime)}
                date={lastMessage.sentTime}
              />
            </Typography>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
