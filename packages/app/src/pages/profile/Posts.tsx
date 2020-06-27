import React from "react";
import PostItem from "../../components/posts/PostItem";
import { usePosts } from "../../hooks/post/usePosts";
import { CircularProgress } from "@material-ui/core";
import EmptyList from "../../components/EmptyList";

function Posts() {
  const posts = usePosts();

  if (!posts) return <CircularProgress />;
  if (posts.length === 0) return <EmptyList text="0 posts" />;

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

export default Posts;
