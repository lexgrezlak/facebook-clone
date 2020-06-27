import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import useDeleteComment from "../../../hooks/post/comment/useDeleteComment";

interface Props {
  commentId: string;
  postId: string;
}

export default function DeleteButton({ commentId, postId }: Props) {
  const { handleDeleteComment } = useDeleteComment({ commentId, postId });
  return (
    <div>
      <IconButton onClick={handleDeleteComment}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
