import React from "react";
import { Avatar, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import { Author } from "../types";
import CustomPaper from "./CustomPaper";

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
    <CustomPaper>
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
    </CustomPaper>
  );
}

export default PostItem;
