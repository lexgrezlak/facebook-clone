import React, { useState } from "react";
import { IconButton, Typography } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import { CommentsInfo, FeedData } from "../../types";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";
import { useMutation, gql, useApolloClient } from "@apollo/client";
import { GET_FEED } from "../../graphql/queries";

interface Props {
  postId: string;
  commentsInfo: CommentsInfo;
  toggleComments: () => void;
}

export default function Comment({
  postId,
  commentsInfo,
  toggleComments,
}: Props) {
  return (
    <div>
      <IconButton onClick={toggleComments}>
        <CommentIcon />
      </IconButton>
      <Typography>{commentsInfo.comments}</Typography>
    </div>
  );
}
