import React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME, GET_USER, SEND_INVITATION } from "../queries";
import { CircularProgress, Typography } from "@material-ui/core";
import PostItem from "../components/PostItem";
import { Author } from "../types";
import AddFriendButton from "../components/AddFriendButton";

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
  const { id } = useParams();
  const { data } = useQuery<UserData, UserVars>(GET_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    variables: { id: Number(id) },
  });

  if (!data?.user) return <CircularProgress />;

  const { user } = data;

  return (
    <div>
      <div>
        <Typography>
          {user.firstName} {user.lastName}
        </Typography>
        <AddFriendButton id={Number(id)} />
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
