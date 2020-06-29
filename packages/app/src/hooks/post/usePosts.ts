import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import { PostsData } from "../../types";

interface PostsVars {
  userId?: string;
}

export function usePosts() {
  // gonna be undefined if it's home page
  const { id: userId } = useParams();
  const variables = userId && { variables: { userId } };

  const { data, fetchMore } = useQuery<PostsData, PostsVars>(GET_POSTS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    ...variables,
  });

  const posts = data?.posts.edges;
  const hasNextPage = data?.posts.pageInfo.hasNextPage;
  const endCursor = data?.posts.pageInfo.endCursor;

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

  return { posts, hasNextPage, endCursor, loadMore };
}
