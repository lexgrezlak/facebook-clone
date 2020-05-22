import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FEED } from "../../queries";
import { CircularProgress, Link, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostItem from "../../components/PostItem";

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface Post {
  id: number;
  content: string;
  author: User;
  createdAt: Date;
}

interface FeedData {
  feed: Post[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
}));

function Feed() {
  const classes = useStyles();
  const { data, loading } = useQuery<FeedData>(GET_FEED, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (loading) return <CircularProgress />;

  return (
    <div className={classes.root}>
      {data?.feed.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Feed;
