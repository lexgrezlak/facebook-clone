import React from "react";
import PostItem from "../../../components/post/PostItem";
import { Post, UserPreviewAndPosts } from "../../../types";

interface Props {
  user: UserPreviewAndPosts;
}

function ProfileFeed({ user }: Props) {
  const { posts, ...restUser } = user;

  return (
    <div>
      <ul>
        {posts.map((post: Post) => (
          <PostItem key={post.id} post={post} user={restUser} />
        ))}
      </ul>
    </div>
  );
}

export default ProfileFeed;
