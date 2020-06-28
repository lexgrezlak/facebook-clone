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

  const { data } = useQuery<PostsData, PostsVars>(GET_POSTS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    ...variables,
  });

  const posts = data?.posts.edges;

  return posts;
}
