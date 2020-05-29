import { useMutation } from "@apollo/client";
import { GET_FEED } from "../graphql/queries";
import { PostAndUser } from "../types";
import { DELETE_POST } from "../graphql/mutations";

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
            feed: data.feed.filter((post: PostAndUser) => post.id !== id),
          },
        });
      },
    });
  }

  return { handleDeletePost };
}
