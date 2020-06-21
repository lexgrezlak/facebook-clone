import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHAT } from "../graphql/queries";
import { UserPreview, Message, ChatData } from "../types";
import {
  CircularProgress,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import MyTextField from "./MyTextField";
import { Formik, Form } from "formik";
import { useCreateMessageFormManagement } from "../hooks/useCreateMessageFormManagement";

interface ChatVars {
  id: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    userInfo: {
      display: "flex",
    },
  })
);

export default function Chat() {
  const classes = useStyles();
  const { id } = useParams();
  const { data } = useQuery<ChatData, ChatVars>(GET_CHAT, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    variables: { id },
  });

  const {
    handleCreateMessage,
    initialValues,
    validationSchema,
  } = useCreateMessageFormManagement({ chatId: id });

  if (!data?.chat) return <CircularProgress />;

  const { messages, users } = data.chat;

  console.log(messages[1]);

  return (
    <div>
      <div>
        {users.map((user) => (
          <div className={classes.userInfo} key={user.id}>
            <Avatar src={user.avatar} />
            <Typography variant="h5">{user.fullName}</Typography>
          </div>
        ))}
      </div>
      <div>
        {messages.map((message) => (
          // <div key={message.id}>
          //   <div>{message.user.fullName}</div>
          //   <div>{message.content}</div>
          // </div>
          <ListItem key={message.id}>
            <Avatar src={message.user.avatar} />
            <ListItemText primary={message.content} />
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
                rows={2}
                multiline
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
