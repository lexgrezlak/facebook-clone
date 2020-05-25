import React from "react";
import { Avatar, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import { Author } from "../types";

interface Post {
  id: number;
  content: string;
  author: Author;
  createdAt: Date;
}

interface Props {
  post: Post;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(0, 0, 3),
  },
}));

function PostItem({ post }: Props) {
  const classes = useStyles();
  const { author } = post;
  const fullName = `${author.firstName} ${author.lastName}`;

  return (
    <Paper className={classes.paper}>
      <div className={classes.header}>
        <div>
          <Link to={`/users/${author.id}`}>
            <Avatar src={author.avatar} alt={fullName} />
            {fullName}
          </Link>
          <Typography variant="subtitle2">
            posted <Moment fromNow date={post.createdAt} />
          </Typography>
        </div>

        <div>settings</div>
      </div>

      <div>
        <Typography>{post.content}</Typography>
      </div>
    </Paper>
  );
}

export default PostItem;
