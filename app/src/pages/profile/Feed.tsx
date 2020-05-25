import React from "react";
import PostItem from "../../components/PostItem";
import { Post } from "../Profile";

interface Props {
  posts: Post[];
}

function Feed({ posts }: Props) {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default Feed;
