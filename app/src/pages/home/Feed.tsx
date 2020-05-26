import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FEED } from "../../queries";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostItem from "../../components/post/PostItem";
import { PostAndAuthor } from "../../types";

interface FeedData {
  feed: PostAndAuthor[];
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
        <PostItem post={post} key={post.id} author={post.author} />
      ))}
    </div>
  );
}

export default Feed;
