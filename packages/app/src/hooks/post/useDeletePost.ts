import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import { DELETE_POST } from "../../graphql/mutations";
import { PostsData } from "../../types";

interface Props {
  id: string;
}

export function useDeletePost({ id }: Props) {
  const [deletePost] = useMutation(DELETE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  // undefined if it's home page
  const { id: userId } = useParams();

  function handleDeletePost() {
    return deletePost({
      variables: { id },
      optimisticResponse: {
        deletePost: true,
      },
      update: (store) => {
        const variables = userId && {
          variables: { userId },
        };

        const { posts } = store.readQuery({
          query: GET_POSTS,
          ...variables,
        }) as PostsData;

        store.writeQuery({
          query: GET_POSTS,
          ...variables,
          data: {
            posts: {
              ...posts,
              edges: posts.edges.filter((post) => post.id !== id),
            },
          },
        });
      },
    });
  }

  return { handleDeletePost };
}
