import { useParams } from "react-router-dom";
import { FeedData, UserData } from "../../types";
import { useMutation } from "@apollo/client";
import { GET_POSTS, GET_USER } from "../../graphql/queries";
import { DELETE_POST } from "../../graphql/mutations";

interface Props {
  id: string;
}

export function useDeletePost({ id }: Props) {
  const [deletePost] = useMutation(DELETE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const { id: userId } = useParams();

  function handleDeletePost() {
    return deletePost({
      variables: { id },
      optimisticResponse: {
        deletePost: true,
      },
      update: (store) => {
        // if its user's profile
        if (userId) {
          const { user } = store.readQuery({
            query: GET_USER,
            variables: { id: userId },
          }) as UserData;

          store.writeQuery({
            query: GET_USER,
            variables: { id: userId },
            data: {
              user: {
                ...user,
                posts: user.posts.filter((post) => post.id !== id),
              },
            },
          });

          // else it's home page
        } else {
          const { feed } = store.readQuery({ query: GET_POSTS }) as FeedData;
          store.writeQuery({
            query: GET_POSTS,
            data: {
              feed: {
                ...feed,
                edges: feed.edges.filter((post) => post.id !== id),
              },
            },
          });
        }
      },
    });
  }

  return { handleDeletePost };
}
