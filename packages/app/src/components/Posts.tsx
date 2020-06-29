import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostItem from "./posts/PostItem";
import InfiniteScroll from "react-infinite-scroller";
import { usePosts } from "../hooks/post/usePosts";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
}));

function Posts() {
  const classes = useStyles();
  const { posts, hasNextPage, endCursor, loadMore } = usePosts();

  if (!posts) return <CircularProgress />;

  return (
    <div className={classes.root}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasNextPage}
        loader={<div key={endCursor}>Loading...</div>}
      >
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Posts;
