import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useLikeButtonManagement from "../../hooks/useLikeButtonManagement";

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
        <IconButton onClick={handleUnlike}>
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton onClick={handleLike}>
          <FavoriteBorderIcon />
        </IconButton>
      )}
      <Typography>{likes}</Typography>
    </div>
  );
}
