import { GET_IS_POST_LIKED, GET_LIKES_OF_POST } from "./../../graphql/queries";
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
        store.writeQuery({
          query: GET_IS_POST_LIKED,
          variables: { postId },
          data: {
            isPostLiked: true,
          },
        });

        const { likesOfPost } = store.readQuery({
          query: GET_LIKES_OF_POST,
          variables: { postId },
        }) as LikesOfPostData;

        store.writeQuery({
          query: GET_LIKES_OF_POST,
          variables: { postId },
          data: {
            likesOfPost: likesOfPost + 1,
          },
        });

        //   const data = store.readQuery({
        //     query: GET_FRIEND_REQUESTS,
        //   }) as FriendRequestsData;
        //   store.writeQuery({
        //     query: GET_FRIEND_REQUESTS,
        //     data: {
        //       friendRequests: data.friendRequests.filter(
        //         (friendRequest: FriendRequest) =>
        //           friendRequest.fromUser.id !== userId
        //       ),
        //     },
        //   });
      },
    });
  }

  return { handleLike };
}
