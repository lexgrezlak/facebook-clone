import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import { CommentsInfo } from "../../types";

interface Props {
  postId: string;
  commentsInfo: CommentsInfo;
  toggleComments: () => void;
}

export default function Comment({ commentsInfo, toggleComments }: Props) {
  return (
    <div>
      <IconButton onClick={toggleComments}>
        <CommentIcon />
      </IconButton>
      <Typography>{commentsInfo.comments}</Typography>
    </div>
  );
}
