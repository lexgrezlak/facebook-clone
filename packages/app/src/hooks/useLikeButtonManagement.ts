import React from "react";
import { useLike } from "./PostLikeButtonManagement/useLike";
import useIsLiked from "./PostLikeButtonManagement/useIsLiked";
import { useUnlike } from "./PostLikeButtonManagement/useUnlike";

interface Props {
  postId: string;
}

export default function useLikeButtonManagement({ postId }: Props) {
  const { handleLike } = useLike({ postId });
  const { handleUnlike } = useUnlike({ postId });
  const { isLiked } = useIsLiked({ postId });

  return { handleLike, handleUnlike, isLiked };
}
