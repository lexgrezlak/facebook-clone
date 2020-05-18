import React, { useState } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { CREATE_POST, GET_FEED, GET_ME } from "./queries";
import { Navigate, useNavigate } from "react-router-dom";
import SignInOrUp from "./SignInOrUp";

interface Post {
  id: string;
  content: string;
  author: {
    email: string;
  };
}

function Home() {
  const client = useApolloClient();
  const [content, setContent] = useState("");
  const { data, loading, error } = useQuery(GET_FEED, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  const [createPost] = useMutation(CREATE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleSignOut() {
    localStorage.clear();
    client.writeQuery({
      query: GET_ME,
      data: {
        me: null,
      },
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    createPost({ variables: { content } });
    setContent("");
  }

  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;

  const { feed } = data;
  console.log(feed);

  return (
    <div>
      <div>
        {feed.map((post: Post) => (
          <div key={post.id}>{post.content}</div>
        ))}
      </div>
      <button onClick={handleSignOut}>Sign out</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">content </label>
          <input
            id="content"
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default Home;
