import { FeedData } from "../../types";
import { useMutation } from "@apollo/client";
import { GET_FEED } from "../../graphql/queries";
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

  function handleDeletePost() {
    return deletePost({
      variables: { id },
      update: (store) => {
        const { feed } = store.readQuery({ query: GET_FEED }) as FeedData;
        store.writeQuery({
          query: GET_FEED,
          data: {
            feed: {
              ...feed,
              edges: feed.edges.filter((post) => post.id !== id),
            },
          },
        });
      },
    });
  }

  return { handleDeletePost };
}
