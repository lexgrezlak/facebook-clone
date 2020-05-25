import React, { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_POST, GET_FEED, GET_ME } from "../../queries";
import {
  Avatar,
  Button,
  createStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    img: {
      width: "50px",
    },
  })
);

function CreatePostForm() {
  const classes = useStyles();
  const client = useApolloClient();
  const [content, setContent] = useState("");
  const [createPost] = useMutation(CREATE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const data = client.readQuery({ query: GET_ME });
  const { firstName, lastName, avatar } = data.me;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await createPost({
      variables: { content },
      optimisticResponse: {
        __typename: "Mutation",
        createPost: {
          __typename: "Post",
          author: {
            firstName,
            lastName,
            id: 100000 + Math.random() * 99999,
            __typename: "User",
          },
          content,
          createdAt: new Date(),
          id: 100000 + Math.random() * 999999,
        },
      },
      update: (store, { data: { createPost } }) => {
        const data = store.readQuery({ query: GET_FEED }) as any;
        store.writeQuery({
          query: GET_FEED,
          data: {
            ...data,
            feed: [createPost, ...data.feed],
          },
        });
      },
    });
    setContent("");
  }

  return (
    <div className={classes.root}>
      {avatar && <Avatar src={avatar} alt={`${firstName} ${lastName}`} />}
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="content"
            fullWidth
            margin="normal"
            variant="outlined"
            type="text"
            rows="5"
            multiline
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={`What's on your mind, ${firstName}?`}
          />
        </div>
        <Button variant="contained" type="submit">
          Post
        </Button>
      </form>
    </div>
  );
}

export default CreatePostForm;
