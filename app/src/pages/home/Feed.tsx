import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FEED } from "../../queries";

interface Post {
  id: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
}

interface FeedData {
  feed: Post[];
}

function Feed() {
  const { data, loading } = useQuery<FeedData>(GET_FEED, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (loading) return <div>loading...</div>;

  return (
    <ul>
      {data?.feed.map((post) => (
        <li key={post.id}>{post.content}</li>
      ))}
    </ul>
  );
}

export default Feed;
