import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useLikeButtonManagement from "../../hooks/useLikeButtonManagement";
import { LikesInfo } from "../../types";
import LikeButton from "./like/LikeButton";
import UnlikeButton from "./like/UnlikeButton";

interface Props {
  likesInfo: LikesInfo;
  postId: string;
}

export default function Like({ likesInfo, postId }: Props) {
  const { handleLike, handleUnlike } = useLikeButtonManagement({
    postId,
  });

  const { isLiked, likes } = likesInfo;

  return (
    <div>
      {isLiked ? (
        <UnlikeButton handleClick={handleUnlike} />
      ) : (
        <LikeButton handleClick={handleLike} />
      )}
      <Typography>{likes}</Typography>
    </div>
  );
}
