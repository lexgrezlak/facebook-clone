import React, { useState } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { CREATE_POST, GET_FEED, GET_ME } from "../queries";
import CreatePostForm from "./home/CreatePostForm";

interface Post {
  id: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: Date;
}

interface FeedData {
  feed: Post[];
}

function Home() {
  const client = useApolloClient();
  const { data, loading, error } = useQuery<FeedData>(GET_FEED, {
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

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
      <CreatePostForm />
      <div>
        {data?.feed.map((post: Post) => (
          <div key={post.id}>{post.content}</div>
        ))}
      </div>
    </div>
  );
}

export default Home;
