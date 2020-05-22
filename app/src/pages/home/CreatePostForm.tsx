import React, { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_POST, GET_FEED, GET_ME } from "../../queries";

function CreatePostForm() {
  const client = useApolloClient();
  const [content, setContent] = useState("");
  const [createPost] = useMutation(CREATE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const data = client.readQuery({ query: GET_ME });
  const { firstName, lastName } = data.me;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    createPost({
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
    <form onSubmit={handleSubmit}>
      <div>
        <input
          style={{ width: "100%" }}
          id="content"
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={`What's on your mind, ${firstName}?`}
        />
      </div>
      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePostForm;
