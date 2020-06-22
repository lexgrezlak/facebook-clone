import React from "react";
import { IconButton, Typography, CircularProgress } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useQuery } from "@apollo/client";
import { GET_LIKES_OF_POST } from "../graphql/queries";
import useLikeButtonManagement from "../hooks/useLikeButtonManagement";
import { LikesOfPostData } from "../types";

interface Props {
  postId: string;
}

interface LikesOfPostVars {
  postId: string;
}

export default function Like({ postId }: Props) {
  const { data } = useQuery<LikesOfPostData, LikesOfPostVars>(
    GET_LIKES_OF_POST,
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
      variables: {
        postId,
      },
    }
  );

  const { handleLike, handleUnlike, isLiked } = useLikeButtonManagement({
    postId,
  });

  if (!data) return <CircularProgress />;
  console.log(data.likesOfPost);

  return (
    <div>
      {isLiked ? (
        <IconButton onClick={handleUnlike}>
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton onClick={handleLike}>
          <FavoriteBorderIcon />
        </IconButton>
      )}
      <Typography>{data.likesOfPost}</Typography>
    </div>
  );
}
