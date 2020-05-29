import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import { StyledPaper } from "../../styled/StyledPaper";
import { UserPreview } from "../../types";
import PostMenu from "./PostMenu";
import { useApolloClient } from "@apollo/client";
import { GET_ME } from "../../graphql/queries";

interface Post {
  id: number;
  content: string;
  createdAt: Date;
}

interface Props {
  post: Post;
  user: UserPreview;
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(0, 0, 3),
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
    "&:visited": {
      color: "inherit",
    },
  },
  flex: {
    display: "flex",
  },
  postInfo: {
    marginLeft: theme.spacing(1),
  },
}));

function PostItem({ post, user }: Props) {
  const client = useApolloClient();
  const data = client.readQuery({ query: GET_ME });
  const classes = useStyles();

  const { fullName } = user;

  return (
    <StyledPaper>
      <div className={classes.header}>
        <div className={classes.flex}>
          <Link to={`/users/${user.id}`}>
            <Avatar src={user.avatar} alt={fullName} />
          </Link>
          <div className={classes.postInfo}>
            <Typography
              className={classes.link}
              variant="subtitle1"
              component={Link}
              to={`/users/${user.id}`}
            >
              {fullName}
            </Typography>
            <Typography variant="subtitle2">
              <Moment fromNow date={post.createdAt} />
            </Typography>
          </div>
        </div>
        {data.me.id === user.id && <PostMenu id={post.id} />}
      </div>

      <div>
        <Typography>{post.content}</Typography>
      </div>
    </StyledPaper>
  );
}

export default PostItem;
