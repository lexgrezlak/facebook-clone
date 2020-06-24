import { FeedData } from "./../../types";
import {
  GET_IS_POST_LIKED,
  GET_LIKES_OF_POST,
  GET_FEED,
} from "./../../graphql/queries";
import { useMutation } from "@apollo/client";
import { LIKE_POST } from "../../graphql/mutations";
import { LikesOfPostData } from "../../types";

interface Props {
  postId: string;
}

export function useLike({ postId }: Props) {
  const [like] = useMutation(LIKE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleLike() {
    return like({
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
              likes: likes + 1,
              isLiked: true,
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

  return { handleLike };
}
