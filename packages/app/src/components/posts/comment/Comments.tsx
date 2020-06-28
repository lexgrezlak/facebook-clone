import React from "react";
import CommentList from "./CommentList";
import CreateCommentForm from "./CreateCommentForm";
import { useComments } from "../../../hooks/post/comment/useComments";

interface Props {
  postId: string;
}

export default function Comments({ postId }: Props) {
  const comments = useComments({ postId });

  return (
    <div>
      <CommentList comments={comments} postId={postId} />
      <CreateCommentForm postId={postId} />
    </div>
  );
}
