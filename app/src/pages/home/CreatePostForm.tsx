import React, { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_POST, GET_ME } from "../../queries";

function CreatePostForm() {
  const client = useApolloClient();
  const [content, setContent] = useState("");
  const [createPost] = useMutation(CREATE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const data = client.readQuery({ query: GET_ME });
  const { firstName } = data.me;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    createPost({ variables: { content } });
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
