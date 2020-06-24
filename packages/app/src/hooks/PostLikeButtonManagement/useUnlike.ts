import { FeedData } from "./../../types";
import { GET_FEED } from "./../../graphql/queries";
import { useMutation } from "@apollo/client";
import { UNLIKE_POST } from "../../graphql/mutations";

interface Props {
  postId: string;
}

export function useUnlike({ postId }: Props) {
  const [unlike] = useMutation(UNLIKE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleUnlike() {
    return unlike({
      variables: { postId },
      update: (store) => {
        const dataInStore = store.readQuery({
          query: GET_FEED,
        }) as FeedData;

        const updatedEdges = dataInStore.feed.edges.map((post) => {
          if (post.id === postId) {
            const { likesInfo } = post;
            const { likes } = likesInfo;

            const updatedLikesInfo = {
              ...likesInfo,
              likes: likes - 1,
              isLiked: false,
            };
            return { ...post, likesInfo: updatedLikesInfo };
          }

          return post;
        });

        store.writeQuery({
          query: GET_FEED,
          variables: { postId },
          data: {
            feed: {
              ...dataInStore.feed,
              edges: updatedEdges,
            },
          },
        });
      },
    });
  }

  return { handleUnlike };
}
