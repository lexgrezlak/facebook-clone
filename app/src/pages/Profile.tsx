import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../queries";
import { CircularProgress, Typography } from "@material-ui/core";
import PostItem from "../components/PostItem";
import { Author } from "../types";
import FriendButton from "../components/FriendButton";

interface Post {
  id: number;
  content: string;
  createdAt: Date;
  author: Author;
}

interface User {
  firstName: string;
  lastName: string;
  posts: Post[];
}

interface UserData {
  user: User;
}

interface UserVars {
  id: number;
}

function Profile() {
  const { id: stringId } = useParams();
  const id = Number(stringId);

  const { data } = useQuery<UserData, UserVars>(GET_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    variables: { id },
  });

  if (!data?.user) return <CircularProgress />;

  const { user } = data;

  return (
    <div>
      <div>
        <Typography>
          {user.firstName} {user.lastName}
        </Typography>
        <FriendButton id={id} />
      </div>
      <div>
        <ul>
          {user.posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
