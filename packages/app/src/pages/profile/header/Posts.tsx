import React from "react";
import PostItem from "../../../components/posts/PostItem";
import { UserPreviewAndPosts } from "../../../types";

interface Props {
  user: UserPreviewAndPosts;
}

function Posts({ user }: Props) {
  const { posts, ...restUser } = user;

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} user={restUser} />
        ))}
      </ul>
    </div>
  );
}

export default Posts;
