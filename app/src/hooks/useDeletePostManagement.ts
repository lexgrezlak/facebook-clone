import { useMutation } from "@apollo/client";
import { DELETE_POST, GET_FEED } from "../queries";
import { PostAndAuthor } from "../types";

interface Props {
  id: number;
}

export function useDeletePostManagement({ id }: Props) {
  const [deletePost] = useMutation(DELETE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  function handleDeletePost() {
    return deletePost({
      variables: { id },
      update: (store) => {
        const data = store.readQuery({ query: GET_FEED }) as any;
        store.writeQuery({
          query: GET_FEED,
          data: {
            feed: data.feed.filter((post: PostAndAuthor) => post.id !== id),
          },
        });
      },
    });
  }

  return { handleDeletePost };
}
