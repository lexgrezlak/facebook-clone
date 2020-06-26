import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_CHAT, GET_CHATS } from "../graphql/queries";
import { ChatsData, ChatData } from "../types";
import {
  CircularProgress,
  Button,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import MyTextField from "../components/MyTextField";
import { Formik, Form } from "formik";
import { useCreateMessageFormManagement } from "../hooks/chat/useCreateMessageFormManagement";
import Moment from "react-moment";
import { useChat } from "../hooks/chat/useChat";

interface ChatVars {
  id: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    userInfo: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      "&:visited": {
        color: "inherit",
      },
    },
  })
);

export default function Chat() {
  const classes = useStyles();
  const { id } = useParams();
  const { chat } = useChat({ chatId: id });

  const {
    handleCreateMessage,
    initialValues,
    validationSchema,
  } = useCreateMessageFormManagement({ chatId: id });

  if (!chat) return <CircularProgress />;

  const { messages, users } = chat;

  return (
    <div>
      <div>
        {users.map((user) => (
          <Link
            to={`/users/${user.id}`}
            className={classes.userInfo}
            key={user.id}
          >
            <Avatar src={user.avatar} />
            <Typography variant="h5">{user.fullName}</Typography>
          </Link>
        ))}
      </div>
      <div>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <Link to={`/users/${message.user.id}`}>
              <Avatar src={message.user.avatar} />
            </Link>
            <ListItemText
              primary={message.content}
              secondary={<Moment fromNow date={message.sentTime} />}
            />
          </ListItem>
        ))}
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleCreateMessage}
        validationSchema={validationSchema}
      >
        {() => (
          <Form noValidate>
            <div>
              <MyTextField
                type="text"
                name="content"
                autoComplete="off"
                margin="none"
              />
            </div>
            <Button variant="contained" type="submit" fullWidth>
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
