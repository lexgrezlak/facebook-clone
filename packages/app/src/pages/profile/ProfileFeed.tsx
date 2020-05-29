import React from "react";
import PostItem from "../../components/post/PostItem";
import { Post, UserPreviewAndPosts } from "../../types";

interface Props {
  user: UserPreviewAndPosts;
}

function ProfileFeed({ user }: Props) {
  const { posts, ...author } = user;

  return (
    <div>
      <ul>
        {posts.map((post: Post) => (
          <PostItem key={post.id} post={post} author={author} />
        ))}
      </ul>
    </div>
  );
}

export default ProfileFeed;
