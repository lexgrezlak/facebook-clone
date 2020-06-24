import React from "react";
import { useLike } from "./useLike";
import useIsLiked from "./post/useIsLiked";
import { useUnlike } from "./useUnlike";

interface Props {
  postId: string;
}

export default function useLikeButtonManagement({ postId }: Props) {
  const { handleLike } = useLike({ postId });
  const { handleUnlike } = useUnlike({ postId });

  return { handleLike, handleUnlike };
}
