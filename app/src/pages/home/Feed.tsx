import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FEED } from "../../queries";
import { Link, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Moment from "react-moment";

interface Post {
  id: string;
  content: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
}

console.log("ddd");
interface FeedData {
  feed: Post[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
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

function Feed() {
  const classes = useStyles();
  const { data, loading } = useQuery<FeedData>(GET_FEED, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (loading) return <div>loading...</div>;

  return (
    <div className={classes.root}>
      {data?.feed.map((post) => (
        <Paper key={post.id} className={classes.paper}>
          <div className={classes.header}>
            <div>
              <Link to={`users/${post.author.id}`} component={RouterLink}>
                {`${post.author.firstName} ${post.author.lastName}`}
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
      ))}
    </div>
  );
}

export default Feed;
