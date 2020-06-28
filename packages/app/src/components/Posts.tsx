import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostItem from "./posts/PostItem";
import InfiniteScroll from "react-infinite-scroller";
import { PostsData } from "../types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
}));

function Posts() {
  const classes = useStyles();
  const { data, fetchMore } = useQuery<PostsData>(GET_POSTS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (!data?.posts) return <CircularProgress />;

  const {
    edges: posts,
    pageInfo: { hasNextPage, endCursor },
  } = data.posts;

  async function loadMore() {
    await fetchMore({
      query: GET_POSTS,
      variables: { cursor: endCursor },
      updateQuery: (previousResult: PostsData, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return previousResult;

        const {
          edges: newEdges,
          pageInfo: newPageInfo,
          __typename,
        } = fetchMoreResult.posts;

        const { edges: previousEdges } = previousResult.posts;

        return {
          posts: {
            __typename,
            edges: [...previousEdges, ...newEdges],
            pageInfo: newPageInfo,
          },
        };
      },
    });
  }

  return (
    <div className={classes.root}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasNextPage}
        loader={<div key={endCursor}>Loading...</div>}
      >
        {posts.map((post) => (
          <PostItem post={post} key={post.id} user={post.user} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Posts;
