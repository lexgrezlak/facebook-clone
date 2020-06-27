import React from "react";
import { Comment } from "../../../types";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Moment from "react-moment";
import { getFormat } from "../../../utils";
import { Link } from "react-router-dom";
import { useMe } from "../../../hooks/useMe";
import DeleteButton from "./DeleteButton";

const useStyles = makeStyles(() => ({
  link: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "inherit",
  },
  date: {
    display: "flex",
    justifyContent: "center",
  },
}));

interface Props {
  comment: Comment;
  postId: string;
}

export default function CommentItem({ comment, postId }: Props) {
  const classes = useStyles();
  const me = useMe();
  const { id, user, content, createdAt } = comment;
  return (
    <ListItem>
      <ListItemAvatar>
        <Link to={`/users/${user.id}`} className={classes.link}>
          <Avatar src={user.avatar} />
        </Link>
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Typography
              variant="subtitle1"
              className={classes.link}
              component={Link}
              to={`/users/${user.id}`}
            >
              {user.fullName}
            </Typography>
            <Typography variant="subtitle2">{content}</Typography>
          </>
        }
      />
      <Typography variant="caption" gutterBottom>
        <div className={classes.date}>
          <Moment
            // HH:mm when less than 1 day has elapsed
            // DD/MM/YYYY when 1 day or more has elapsed
            format={getFormat(createdAt)}
            date={createdAt}
          />
        </div>
        {me.id === user.id && <DeleteButton commentId={id} postId={postId} />}
      </Typography>
    </ListItem>
  );
}
