import React from "react";
import { Comment } from "../../../types";
import { CircularProgress, List } from "@material-ui/core";
import CommentItem from "./CommentItem";

interface Props {
  comments: Comment[] | undefined;
  postId: string;
}

export default function CommentList({ comments, postId }: Props) {
  if (!comments) return <CircularProgress />;

  return (
    <List>
      {comments.map((comment) => (
        <CommentItem comment={comment} key={comment.id} postId={postId} />
      ))}
    </List>
  );
}
